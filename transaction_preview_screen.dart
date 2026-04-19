// app/lib/screens/transaction_preview_screen.dart

import 'package:flutter/material.dart';

class TransactionPreviewScreen extends StatelessWidget {
  final String toAddress;
  final String amount;
  final String symbol;
  final String network;
  final VoidCallback onConfirm;

  const TransactionPreviewScreen({
    super.key,
    required this.toAddress,
    required this.amount,
    required this.symbol,
    required this.network,
    required this.onConfirm,
  });

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(title: const Text("Confirm Transaction")),

      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [

            Container(
              padding: const EdgeInsets.all(15),
              decoration: BoxDecoration(
                color: Colors.grey.shade100,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                children: [

                  _row("Network", network),
                  _row("To", toAddress),
                  _row("Amount", "$amount $symbol"),

                  const SizedBox(height: 10),

                  const Divider(),

                  const SizedBox(height: 10),

                  _row("Estimated Gas", "~0.0003 $symbol"),

                ],
              ),
            ),

            const Spacer(),

            ElevatedButton(
              onPressed: onConfirm,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF3375BB),
                minimumSize: const Size(double.infinity, 55),
              ),
              child: const Text(
                "Confirm & Send",
                style: TextStyle(color: Colors.white),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _row(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label),
          Expanded(
            child: Text(
              value,
              textAlign: TextAlign.right,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }
}
