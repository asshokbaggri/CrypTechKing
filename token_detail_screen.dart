import 'package:flutter/material.dart';
import 'send_screen.dart';
import 'receive_screen.dart';

class TokenDetailScreen extends StatelessWidget {
  final String symbol;
  final double balance;
  final double price;
  final double change;
  final String walletAddress;

  const TokenDetailScreen({
    super.key,
    required this.symbol,
    required this.balance,
    required this.price,
    required this.change,
    required this.walletAddress,
  });

  @override
  Widget build(BuildContext context) {

    final usdValue = balance * price;

    return Scaffold(
      appBar: AppBar(
        title: Text(symbol),
      ),

      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [

            // 🔥 BALANCE
            Text(
              balance.toStringAsFixed(6),
              style: const TextStyle(
                fontSize: 26,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 5),

            Text(
              "\$${usdValue.toStringAsFixed(2)}",
              style: const TextStyle(color: Colors.grey),
            ),

            const SizedBox(height: 10),

            Text(
              "${change >= 0 ? "+" : ""}${change.toStringAsFixed(2)}%",
              style: TextStyle(
                color: change >= 0 ? Colors.green : Colors.red,
                fontWeight: FontWeight.w600,
              ),
            ),

            const SizedBox(height: 25),

            // 🔥 ACTION BUTTONS
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [

                _btn(context, Icons.send, "Send", () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) => SendScreen(
                        walletAddress: walletAddress,
                      ),
                    ),
                  );
                }),

                _btn(context, Icons.download, "Receive", () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) => ReceiveScreen(
                        walletAddress: walletAddress,
                      ),
                    ),
                  );
                }),

                _btn(context, Icons.swap_horiz, "Swap", () {}),

                _btn(context, Icons.shopping_cart, "Buy", () {}),
              ],
            ),

            const SizedBox(height: 30),

            // 🔥 PLACEHOLDER (Next step)
            const Text(
              "Transaction History (Coming Soon)",
              style: TextStyle(color: Colors.grey),
            ),

          ],
        ),
      ),
    );
  }

  Widget _btn(BuildContext context, IconData icon, String label, VoidCallback onTap) {
    return Column(
      children: [
        GestureDetector(
          onTap: onTap,
          child: Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: const Color(0xFF3375BB).withOpacity(0.1),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: const Color(0xFF3375BB)),
          ),
        ),
        const SizedBox(height: 6),
        Text(label),
      ],
    );
  }
}
