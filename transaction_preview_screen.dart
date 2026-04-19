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

  double gasFee = 0;
  double total = 0;

  @override
  void initState() {
    super.initState();
    estimateGas();
  }

  // ============================
  // 🔥 GET RPC BY NETWORK
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

  int getChainId() {
    switch (widget.network) {
      case "Ethereum":
        return 1;
      case "Polygon":
        return 137;
      case "BSC":
      default:
        return 56;
    }
  }

  // ============================
  // 🔥 GAS ESTIMATION
  // ============================

  Future<void> estimateGas() async {
    try {
      final rpc = getRpc();

      final client = Web3Client(rpc, Client());

      final gasPrice = await client.getGasPrice();

      final estimatedGas = await client.estimateGas(
        sender: EthereumAddress.fromHex(
            "0x0000000000000000000000000000000000000000"),
        to: EthereumAddress.fromHex(widget.toAddress),
        value: EtherAmount.fromUnitAndValue(
          EtherUnit.ether,
          double.parse(widget.amount),
        ),
      );

      final gasInWei = gasPrice.getInWei * estimatedGas;

      final fee = gasInWei / BigInt.from(10).pow(18);

      final feeDouble = double.parse(fee.toString());

      setState(() {
        gasFee = feeDouble;
        total = double.parse(widget.amount) + gasFee;
        isLoading = false;
      });

      client.dispose();

    } catch (e) {
      setState(() {
        gasFee = 0.0003;
        total = double.parse(widget.amount) + gasFee;
        isLoading = false;
      });
    }
  }

  // ============================
  // 🔥 UI
  // ============================

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: const Text("Confirm Transaction"),
        centerTitle: true,
      ),

      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [

                  // 🔥 ICON + AMOUNT
                  Column(
                    children: [
                      const Icon(Icons.account_balance_wallet,
                          size: 60, color: Color(0xFF3375BB)),

                      const SizedBox(height: 10),

                      Text(
                        "${widget.amount} ${widget.symbol}",
                        style: const TextStyle(
                          fontSize: 26,
                          fontWeight: FontWeight.bold,
                        ),
                      ),

                      const SizedBox(height: 5),

                      const Text(
                        "Sending",
                        style: TextStyle(color: Colors.grey),
                      ),
                    ],
                  ),

                  const SizedBox(height: 25),

                  // 🔥 DETAILS CARD
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(16),
                      color: Colors.grey.shade100,
                    ),
                    child: Column(
                      children: [

                        _row(Icons.account_tree, "Network", widget.network),

                        _row(Icons.person, "To", widget.toAddress),

                        _row(Icons.payments, "Amount",
                            "${widget.amount} ${widget.symbol}"),

                        const Divider(height: 25),

                        _row(Icons.local_gas_station, "Gas Fee",
                            "${gasFee.toStringAsFixed(6)} ${widget.symbol}"),

                        _row(Icons.calculate, "Total",
                            "${total.toStringAsFixed(6)} ${widget.symbol}"),
                      ],
                    ),
                  ),

                  const Spacer(),

                  // 🔥 BUTTON
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
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                      ),
                    ),
                  ),
                ],
              ),
            ),
    );
  }

  // ============================
  // 🔥 ROW WIDGET
  // ============================

  Widget _row(IconData icon, String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [

          Icon(icon, size: 20, color: Colors.grey),

          const SizedBox(width: 10),

          Expanded(
            child: Text(
              label,
              style: const TextStyle(color: Colors.grey),
            ),
          ),

          Expanded(
            child: Text(
              value,
              textAlign: TextAlign.right,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(fontWeight: FontWeight.w500),
            ),
          ),
        ],
      ),
    );
  }
}
