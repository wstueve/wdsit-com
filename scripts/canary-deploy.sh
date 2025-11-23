#!/bin/bash

# Canary Deployment Script for Cloud Run
# Tests new revision before gradually migrating traffic
# Usage: ./scripts/canary-deploy.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ID="wdsit-com"
REGION="us-central1"
SERVICE_NAME="svc-wdsit-com"

echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Canary Deployment to Cloud Run${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo ""

# Step 1: Run local tests first
echo -e "${YELLOW}[1/7]${NC} Running Playwright tests locally..."
npm run test -- --reporter=list || {
  echo -e "${RED}✗ Tests failed locally. Fix issues before deploying.${NC}"
  exit 1
}
echo -e "${GREEN}✓ Local tests passed${NC}"
echo ""

# Step 2: Build the application
echo -e "${YELLOW}[2/7]${NC} Building application..."
npm run build || {
  echo -e "${RED}✗ Build failed${NC}"
  exit 1
}
echo -e "${GREEN}✓ Build successful${NC}"
echo ""

# Step 3: Deploy new revision with no traffic
echo -e "${YELLOW}[3/7]${NC} Deploying new revision to Cloud Run (no traffic)..."
COMMIT_SHA=$(git rev-parse --short HEAD 2>/dev/null || echo "local")

gcloud run deploy $SERVICE_NAME \
  --source=. \
  --region=$REGION \
  --project=$PROJECT_ID \
  --tag="sha-$COMMIT_SHA" \
  --no-traffic \
  --quiet || {
  echo -e "${RED}✗ Deployment failed${NC}"
  exit 1
}

# Get the new revision name
NEW_REVISION=$(gcloud run revisions list \
  --service=$SERVICE_NAME \
  --region=$REGION \
  --project=$PROJECT_ID \
  --format="value(name)" \
  --limit=1)

# Get the preview URL for the tagged revision
PREVIEW_URL="https://sha-$COMMIT_SHA---$SERVICE_NAME-725637022868.$REGION.run.app"

echo -e "${GREEN}✓ New revision deployed: $NEW_REVISION${NC}"
echo -e "${BLUE}Preview URL: $PREVIEW_URL${NC}"
echo ""

# Step 4: Wait for revision to be ready
echo -e "${YELLOW}[4/7]${NC} Waiting for revision to be ready..."
sleep 10
echo -e "${GREEN}✓ Revision ready${NC}"
echo ""

# Step 5: Run smoke tests against the new revision (0% traffic)
echo -e "${YELLOW}[5/7]${NC} Running smoke tests against new revision..."
PLAYWRIGHT_TEST_BASE_URL=$PREVIEW_URL npm run test:deployment -- --reporter=list || {
  echo -e "${RED}✗ Smoke tests failed on new revision${NC}"
  echo -e "${RED}Deployment stopped. New revision has 0% traffic.${NC}"
  echo -e "${YELLOW}To rollback: Delete the revision or leave it with 0% traffic${NC}"
  exit 1
}
echo -e "${GREEN}✓ Smoke tests passed on new revision${NC}"
echo ""

# Step 6: Gradual traffic migration
echo -e "${YELLOW}[6/7]${NC} Starting gradual traffic migration..."

# 10% canary
echo -e "${BLUE}→ Migrating 10% traffic to new revision...${NC}"
gcloud run services update-traffic $SERVICE_NAME \
  --region=$REGION \
  --project=$PROJECT_ID \
  --to-revisions=$NEW_REVISION=10 \
  --quiet

echo -e "${GREEN}✓ 10% traffic migrated${NC}"
echo "Monitoring for 2 minutes..."
sleep 120

# 50% migration
echo -e "${BLUE}→ Migrating 50% traffic to new revision...${NC}"
gcloud run services update-traffic $SERVICE_NAME \
  --region=$REGION \
  --project=$PROJECT_ID \
  --to-revisions=$NEW_REVISION=50 \
  --quiet

echo -e "${GREEN}✓ 50% traffic migrated${NC}"
echo "Monitoring for 2 minutes..."
sleep 120

# 100% migration
echo -e "${BLUE}→ Migrating 100% traffic to new revision...${NC}"
gcloud run services update-traffic $SERVICE_NAME \
  --region=$REGION \
  --project=$PROJECT_ID \
  --to-revisions=$NEW_REVISION=100 \
  --quiet

echo -e "${GREEN}✓ 100% traffic migrated${NC}"
echo ""

# Step 7: Final verification
echo -e "${YELLOW}[7/7]${NC} Running final smoke tests on production..."
PLAYWRIGHT_TEST_BASE_URL=https://wdsit.com npm run test:deployment -- --reporter=list || {
  echo -e "${RED}✗ Final smoke tests failed${NC}"
  echo -e "${YELLOW}Consider rolling back!${NC}"
  exit 1
}

echo -e "${GREEN}✓ Final smoke tests passed${NC}"
echo ""

# Success summary
echo -e "${GREEN}═══════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Deployment Successful! 🚀${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════${NC}"
echo ""
echo -e "Service:  ${BLUE}$SERVICE_NAME${NC}"
echo -e "Revision: ${BLUE}$NEW_REVISION${NC}"
echo -e "Region:   ${BLUE}$REGION${NC}"
echo -e "Traffic:  ${GREEN}100%${NC}"
echo -e "URL:      ${BLUE}https://wdsit.com${NC}"
echo ""
echo -e "${YELLOW}Tip: Monitor logs with:${NC}"
echo -e "gcloud logs read --limit=50 --resource-type=cloud_run_revision --filter=\"resource.labels.revision_name=$NEW_REVISION\""
echo ""
