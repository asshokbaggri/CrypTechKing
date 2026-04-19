// app/lib/screens/transaction_preview_screen.dart

import 'package:flutter/material.dart';
import 'package:web3dart/web3dart.dart';
import 'package:http/http.dart';

class TransactionPreviewScreen extends StatefulWidget {
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
  State<TransactionPreviewScreen> createState() =>
      _TransactionPreviewScreenState();
}

class _TransactionPreviewScreenState
    extends State<TransactionPreviewScreen> {

  bool isLoading = true;

  double gasPriceGwei = 0;
  double gasFee = 0;
  double total = 0;

  int gasLimit = 21000;

  @override
  void initState() {
    super.initState();
    loadGas();
  }

  // ============================
  // 🔥 NETWORK RPC
  // ============================

  String getRpc() {
    switch (widget.network) {
      case "Ethereum":
        return "https://mainnet.infura.io/v3/339315f5c81347debe3b12374712fa4d";
      case "Polygon":
        return "https://polygon-rpc.com/";
      case "BSC":
      default:
        return "https://bsc-dataseed.binance.org/";
    }
  }

  // ============================
  // 🔥 LIVE GAS FETCH
  // ============================

  Future<void> loadGas() async {

    try {
      final client = Web3Client(getRpc(), Client());

      final gasPrice = await client.getGasPrice();

      // wei -> gwei
      gasPriceGwei = gasPrice.getInWei.toDouble() / 1e9;

      // gas limit (simple transfer)
      gasLimit = 21000;

      // gas fee = gasPrice * gasLimit
      gasFee =
          (gasPrice.getInWei.toDouble() * gasLimit) / 1e18;

      final amt = double.tryParse(widget.amount) ?? 0;

      total = amt + gasFee;

      client.dispose();

    } catch (e) {
      gasPriceGwei = 5;
      gasFee = 0.0003;
      total = (double.tryParse(widget.amount) ?? 0) + gasFee;
    }

    if (!mounted) return;

    setState(() {
      isLoading = false;
    });
  }

  // ============================
  // UI
  // ============================

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: const Text("Confirm Transaction"),
      ),

      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [

                  // 🔥 MAIN CARD
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.grey.shade100,
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Column(
                      children: [

                        _row("Network", widget.network),

                        const SizedBox(height: 6),

                        _row("To", widget.toAddress),

                        const SizedBox(height: 6),

                        _row("Amount",
                            "${widget.amount} ${widget.symbol}"),

                        const SizedBox(height: 10),

                        const Divider(),

                        const SizedBox(height: 10),

                        // 🔥 GAS DETAILS
                        _row("Gas Price",
                            "${gasPriceGwei.toStringAsFixed(2)} Gwei"),

                        _row("Gas Limit", gasLimit.toString()),

                        _row("Network Fee",
                            "${gasFee.toStringAsFixed(6)} ${widget.symbol}"),

                        const SizedBox(height: 10),

                        const Divider(),

                        const SizedBox(height: 10),

                        // 🔥 TOTAL
                        _row(
                          "Total",
                          "${total.toStringAsFixed(6)} ${widget.symbol}",
                          isBold: true,
                        ),
                      ],
                    ),
                  ),

                  const Spacer(),

                  // 🔥 CONFIRM BUTTON
                  ElevatedButton(
                    onPressed: widget.onConfirm,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF3375BB),
                      minimumSize: const Size(double.infinity, 55),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
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

  // ============================
  // 🔥 ROW UI
  // ============================

  Widget _row(String label, String value, {bool isBold = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [

          Text(
            label,
            style: TextStyle(
              color: Colors.grey.shade700,
              fontWeight: isBold ? FontWeight.bold : FontWeight.normal,
            ),
          ),

          const Spacer(),

          Expanded(
            child: Text(
              value,
              textAlign: TextAlign.right,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                fontWeight: isBold ? FontWeight.bold : FontWeight.normal,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
