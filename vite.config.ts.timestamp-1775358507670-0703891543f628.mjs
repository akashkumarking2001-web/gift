// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/downloads/New%20folder/gift-main/gift-main/node_modules/vite/dist/node/index.js";
import react from "file:///D:/downloads/New%20folder/gift-main/gift-main/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
var __vite_injected_original_dirname = "D:\\downloads\\New folder\\gift-main\\gift-main";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false
      }
    },
    plugins: [
      react(),
      {
        name: "api-proxy",
        enforce: "pre",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
            res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,Authorization,x-client-id,x-client-secret,x-api-version");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            if (req.method === "OPTIONS") {
              res.statusCode = 204;
              res.end();
              return;
            }
            if (req.url?.startsWith("/api/verify-cashfree-order")) {
              const url = new URL(req.url, `http://${req.headers.host}`);
              const orderId = url.searchParams.get("orderId");
              const appId = env.VITE_CASHFREE_APP_ID;
              const secretKey = env.CASHFREE_SECRET_KEY;
              const baseUrl = env.VITE_CASHFREE_MODE === "production" ? "https://api.cashfree.com/pg" : "https://sandbox.cashfree.com/pg";
              console.log(`[Local API] Verifying order: ${orderId}`);
              try {
                const response = await fetch(`${baseUrl}/orders/${orderId}`, {
                  method: "GET",
                  headers: {
                    "x-client-id": appId,
                    "x-client-secret": secretKey,
                    "x-api-version": "2023-08-01",
                    "accept": "application/json"
                  }
                });
                const data = await response.json();
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(data));
                return;
              } catch (error) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ message: error.message }));
                return;
              }
            }
            if (req.url && req.url.includes("api/create-cashfree-order") && req.method === "POST") {
              console.log(`[Local API V2.2] Intercepted Create Order: ${req.url}`);
              let body = "";
              req.on("data", (chunk) => body += chunk.toString());
              req.on("end", async () => {
                try {
                  console.log(`[Local API V2.2] Preparing request for ${env.VITE_CASHFREE_MODE || "sandbox"} with ID: ${env.VITE_CASHFREE_APP_ID?.slice(0, 8)}...`);
                  const parsedBody = JSON.parse(body);
                  const amount = parsedBody.amount;
                  const c_id = (parsedBody.customer_id || parsedBody.customerId || `guest_${Date.now()}`).toString().substring(0, 50);
                  const c_name = (parsedBody.customer_name || parsedBody.customerName || "Customer").toString();
                  const c_email = (parsedBody.customer_email || parsedBody.customerEmail || "guest@giftmagic.co").toString();
                  let c_phone = (parsedBody.customer_phone || parsedBody.customerPhone || "9876543210").toString().replace(/\D/g, "");
                  if (c_phone.length < 10) c_phone = "9876543210";
                  if (c_phone.length > 10) c_phone = c_phone.substring(c_phone.length - 10);
                  const note = parsedBody.order_note || parsedBody.orderNote || "Gift Magic Purchase";
                  const baseUrl = env.VITE_CASHFREE_MODE === "production" ? "https://api.cashfree.com/pg" : "https://sandbox.cashfree.com/pg";
                  const response = await fetch(`${baseUrl}/orders`, {
                    method: "POST",
                    headers: {
                      "x-client-id": env.VITE_CASHFREE_APP_ID || "",
                      "x-client-secret": env.CASHFREE_SECRET_KEY || "",
                      "x-api-version": "2023-08-01",
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      order_amount: amount,
                      order_currency: "INR",
                      order_id: `ord_${Date.now()}_${Math.random().toString(36).substring(7)}`,
                      customer_details: {
                        customer_id: c_id,
                        customer_name: c_name,
                        customer_email: c_email,
                        customer_phone: c_phone
                      },
                      order_meta: {
                        return_url: `http://localhost:8081/(user)/history?order_id={order_id}`,
                        payment_methods: ""
                        // Leave empty for all methods or specify
                      },
                      order_note: note
                    })
                  });
                  const data = await response.json();
                  console.log(`[Local API V2.2] Cashfree Response: ${response.status}`, JSON.stringify(data).slice(0, 150));
                  res.writeHead(response.status, { "Content-Type": "application/json" });
                  res.end(JSON.stringify(data));
                } catch (err) {
                  console.error("[Local API] error:", err);
                  if (!res.writableEnded) {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: err.message }));
                  }
                }
              });
              return;
            }
            next();
          });
        }
      }
    ],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxkb3dubG9hZHNcXFxcTmV3IGZvbGRlclxcXFxnaWZ0LW1haW5cXFxcZ2lmdC1tYWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxkb3dubG9hZHNcXFxcTmV3IGZvbGRlclxcXFxnaWZ0LW1haW5cXFxcZ2lmdC1tYWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9kb3dubG9hZHMvTmV3JTIwZm9sZGVyL2dpZnQtbWFpbi9naWZ0LW1haW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpO1xuICBcbiAgcmV0dXJuIHtcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGhvc3Q6IFwiOjpcIixcbiAgICAgIHBvcnQ6IDgwODAsXG4gICAgICBobXI6IHtcbiAgICAgICAgb3ZlcmxheTogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgcmVhY3QoKSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ2FwaS1wcm94eScsXG4gICAgICAgIGVuZm9yY2U6ICdwcmUnLFxuICAgICAgICBjb25maWd1cmVTZXJ2ZXIoc2VydmVyKSB7XG4gICAgICAgICAgc2VydmVyLm1pZGRsZXdhcmVzLnVzZShhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICAgICAgICAgIC8vIEdMT0JBTCBNQVBQRUQgQ09SUyBIRUFERVJTXG4gICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nLCAnKicpO1xuICAgICAgICAgICAgcmVzLnNldEhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcycsICdHRVQsIFBPU1QsIE9QVElPTlMsIFBVVCwgUEFUQ0gsIERFTEVURScpO1xuICAgICAgICAgICAgcmVzLnNldEhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycycsICdYLVJlcXVlc3RlZC1XaXRoLGNvbnRlbnQtdHlwZSxBdXRob3JpemF0aW9uLHgtY2xpZW50LWlkLHgtY2xpZW50LXNlY3JldCx4LWFwaS12ZXJzaW9uJyk7XG4gICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFscycsICd0cnVlJyk7XG5cbiAgICAgICAgICAgIC8vIEhhbmRsZSBPUFRJT05TIHByZWZsaWdodFxuICAgICAgICAgICAgaWYgKHJlcS5tZXRob2QgPT09ICdPUFRJT05TJykge1xuICAgICAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDIwNDtcbiAgICAgICAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEhhbmRsZSBDYXNoZnJlZSBWZXJpZmljYXRpb25cbiAgICAgICAgICAgIGlmIChyZXEudXJsPy5zdGFydHNXaXRoKCcvYXBpL3ZlcmlmeS1jYXNoZnJlZS1vcmRlcicpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocmVxLnVybCwgYGh0dHA6Ly8ke3JlcS5oZWFkZXJzLmhvc3R9YCk7XG4gICAgICAgICAgICAgIGNvbnN0IG9yZGVySWQgPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgnb3JkZXJJZCcpO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgY29uc3QgYXBwSWQgPSBlbnYuVklURV9DQVNIRlJFRV9BUFBfSUQ7XG4gICAgICAgICAgICAgIGNvbnN0IHNlY3JldEtleSA9IGVudi5DQVNIRlJFRV9TRUNSRVRfS0VZO1xuICAgICAgICAgICAgICBjb25zdCBiYXNlVXJsID0gZW52LlZJVEVfQ0FTSEZSRUVfTU9ERSA9PT0gJ3Byb2R1Y3Rpb24nIFxuICAgICAgICAgICAgICAgID8gJ2h0dHBzOi8vYXBpLmNhc2hmcmVlLmNvbS9wZycgXG4gICAgICAgICAgICAgICAgOiAnaHR0cHM6Ly9zYW5kYm94LmNhc2hmcmVlLmNvbS9wZyc7XG5cbiAgICAgICAgICAgICAgY29uc29sZS5sb2coYFtMb2NhbCBBUEldIFZlcmlmeWluZyBvcmRlcjogJHtvcmRlcklkfWApO1xuXG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtiYXNlVXJsfS9vcmRlcnMvJHtvcmRlcklkfWAsIHtcbiAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICd4LWNsaWVudC1pZCc6IGFwcElkLFxuICAgICAgICAgICAgICAgICAgICAneC1jbGllbnQtc2VjcmV0Jzogc2VjcmV0S2V5LFxuICAgICAgICAgICAgICAgICAgICAneC1hcGktdmVyc2lvbic6ICcyMDIzLTA4LTAxJyxcbiAgICAgICAgICAgICAgICAgICAgJ2FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNTAwO1xuICAgICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVxLnVybCAmJiByZXEudXJsLmluY2x1ZGVzKCdhcGkvY3JlYXRlLWNhc2hmcmVlLW9yZGVyJykgJiYgcmVxLm1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbTG9jYWwgQVBJIFYyLjJdIEludGVyY2VwdGVkIENyZWF0ZSBPcmRlcjogJHtyZXEudXJsfWApO1xuICAgICAgICAgICAgICBsZXQgYm9keSA9ICcnO1xuICAgICAgICAgICAgICByZXEub24oJ2RhdGEnLCAoY2h1bms6IEJ1ZmZlcikgPT4gYm9keSArPSBjaHVuay50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgcmVxLm9uKCdlbmQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbTG9jYWwgQVBJIFYyLjJdIFByZXBhcmluZyByZXF1ZXN0IGZvciAke2Vudi5WSVRFX0NBU0hGUkVFX01PREUgfHwgJ3NhbmRib3gnfSB3aXRoIElEOiAke2Vudi5WSVRFX0NBU0hGUkVFX0FQUF9JRD8uc2xpY2UoMCwgOCl9Li4uYCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyc2VkQm9keSA9IEpTT04ucGFyc2UoYm9keSk7XG4gICAgICAgICAgICAgICAgLy8gU3VwcG9ydCBib3RoIGNhbWVsQ2FzZSBhbmQgc25ha2VfY2FzZSBmcm9tIGJvZHlcbiAgICAgICAgICAgICAgICBjb25zdCBhbW91bnQgPSBwYXJzZWRCb2R5LmFtb3VudDtcbiAgICAgICAgICAgICAgICBjb25zdCBjX2lkID0gKHBhcnNlZEJvZHkuY3VzdG9tZXJfaWQgfHwgcGFyc2VkQm9keS5jdXN0b21lcklkIHx8IGBndWVzdF8ke0RhdGUubm93KCl9YCkudG9TdHJpbmcoKS5zdWJzdHJpbmcoMCwgNTApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNfbmFtZSA9IChwYXJzZWRCb2R5LmN1c3RvbWVyX25hbWUgfHwgcGFyc2VkQm9keS5jdXN0b21lck5hbWUgfHwgJ0N1c3RvbWVyJykudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjX2VtYWlsID0gKHBhcnNlZEJvZHkuY3VzdG9tZXJfZW1haWwgfHwgcGFyc2VkQm9keS5jdXN0b21lckVtYWlsIHx8ICdndWVzdEBnaWZ0bWFnaWMuY28nKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIENhc2hmcmVlIFNhbmRib3ggaXMgZXh0cmVtZWx5IHN0cmljdDogcGhvbmUgbXVzdCBiZSAxMCBkaWdpdHMgZXhhY3RseVxuICAgICAgICAgICAgICAgIGxldCBjX3Bob25lID0gKHBhcnNlZEJvZHkuY3VzdG9tZXJfcGhvbmUgfHwgcGFyc2VkQm9keS5jdXN0b21lclBob25lIHx8ICc5ODc2NTQzMjEwJykudG9TdHJpbmcoKS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICAgICAgICAgICAgICAgIGlmIChjX3Bob25lLmxlbmd0aCA8IDEwKSBjX3Bob25lID0gJzk4NzY1NDMyMTAnO1xuICAgICAgICAgICAgICAgIGlmIChjX3Bob25lLmxlbmd0aCA+IDEwKSBjX3Bob25lID0gY19waG9uZS5zdWJzdHJpbmcoY19waG9uZS5sZW5ndGggLSAxMCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBub3RlID0gcGFyc2VkQm9keS5vcmRlcl9ub3RlIHx8IHBhcnNlZEJvZHkub3JkZXJOb3RlIHx8ICdHaWZ0IE1hZ2ljIFB1cmNoYXNlJztcblxuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VVcmwgPSBlbnYuVklURV9DQVNIRlJFRV9NT0RFID09PSAncHJvZHVjdGlvbicgXG4gICAgICAgICAgICAgICAgICA/ICdodHRwczovL2FwaS5jYXNoZnJlZS5jb20vcGcnIFxuICAgICAgICAgICAgICAgICAgOiAnaHR0cHM6Ly9zYW5kYm94LmNhc2hmcmVlLmNvbS9wZyc7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke2Jhc2VVcmx9L29yZGVyc2AsIHtcbiAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAneC1jbGllbnQtaWQnOiBlbnYuVklURV9DQVNIRlJFRV9BUFBfSUQgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgICd4LWNsaWVudC1zZWNyZXQnOiBlbnYuQ0FTSEZSRUVfU0VDUkVUX0tFWSB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgJ3gtYXBpLXZlcnNpb24nOiAnMjAyMy0wOC0wMScsXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyX2Ftb3VudDogYW1vdW50LFxuICAgICAgICAgICAgICAgICAgICBvcmRlcl9jdXJyZW5jeTogJ0lOUicsXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyX2lkOiBgb3JkXyR7RGF0ZS5ub3coKX1fJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNyl9YCxcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tZXJfZGV0YWlsczoge1xuICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbWVyX2lkOiBjX2lkLFxuICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbWVyX25hbWU6IGNfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICBjdXN0b21lcl9lbWFpbDogY19lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICBjdXN0b21lcl9waG9uZTogY19waG9uZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvcmRlcl9tZXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuX3VybDogYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4MS8odXNlcikvaGlzdG9yeT9vcmRlcl9pZD17b3JkZXJfaWR9YCxcbiAgICAgICAgICAgICAgICAgICAgICBwYXltZW50X21ldGhvZHM6IFwiXCIgLy8gTGVhdmUgZW1wdHkgZm9yIGFsbCBtZXRob2RzIG9yIHNwZWNpZnlcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJfbm90ZTogbm90ZVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFtMb2NhbCBBUEkgVjIuMl0gQ2FzaGZyZWUgUmVzcG9uc2U6ICR7cmVzcG9uc2Uuc3RhdHVzfWAsIEpTT04uc3RyaW5naWZ5KGRhdGEpLnNsaWNlKDAsIDE1MCkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJlcy53cml0ZUhlYWQocmVzcG9uc2Uuc3RhdHVzLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tMb2NhbCBBUEldIGVycm9yOicsIGVycik7XG4gICAgICAgICAgICAgICAgICBpZiAoIXJlcy53cml0YWJsZUVuZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy53cml0ZUhlYWQoNTAwLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogZXJyLm1lc3NhZ2UgfSkpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybjsgLy8gU3RvcCBwcm9jZXNzaW5nIHRoaXMgcmVxdWVzdFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErVCxTQUFTLGNBQWMsZUFBZTtBQUNyVyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBRmpCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcs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
