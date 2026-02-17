Here is the summary of the strategy to support your $500/month price point:

1. How far back? 2 Years (Rolling Window)
Why: This captures two full cycles of seasonality (e.g., two Black Fridays), allowing the model to learn Year-Over-Year trends.
Relevance: Data older than 2 years is often "stale" (consumer habits change) and can actually hurt accuracy.
2. How many records?
Minimum: 1,000 orders (Technical hard limit for Vertex AI).
Target: 10,000+ orders (Ideal for high accuracy).
Maximum Cap: 100,000 orders. If a store has millions of orders, we only train on the most recent 100k. This controls your compute costs while still providing a top-tier model (diminishing returns apply after 100k).
3. The "Premium" Reality Check
For a merchant to pay $500/month, they are likely doing $50k - $100k/month in revenue.

At an Average Order Value of $50, that is 1,000 - 2,000 orders per month.
In a 2-year window, that gives you 24,000 - 48,000 records.
Conclusion: Your ideal customer will naturally have plenty of data. The "low data" stores are likely too small to afford your app, so you don't need to over-optimize for them.
4. Strategy for "Low Data" Stores
If a smaller store installs the app (or a big store is just starting out):

Check: If Total Orders < 1,000.
Action: Do not run the AI training (it will fail or be poor).
Fallback: Use a "Best Sellers" heuristic instead. Tell them: "We need a bit more data to personalize. For now, we are targeting based on global best-sellers."