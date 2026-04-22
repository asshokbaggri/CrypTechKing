// app/lib/screens/token_detail_screen.dart

import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:http/http.dart' as http;
import 'package:fl_chart/fl_chart.dart';

import '../core/wallet_service.dart';
import 'send_screen.dart';
import 'receive_screen.dart';

class TokenDetailScreen extends StatefulWidget {
  final String symbol;
  final double balance;
  final double price;
  final double change;
  final String walletAddress;

  final String network;
  final String contract;
  final bool isNative;

  const TokenDetailScreen({
    super.key,
    required this.symbol,
    required this.balance,
    required this.price,
    required this.change,
    required this.walletAddress,
    required this.network,
    required this.contract,
    required this.isNative,
  });

  @override
  State<TokenDetailScreen> createState() => _TokenDetailScreenState();
}

class _TokenDetailScreenState extends State<TokenDetailScreen> {

  List<FlSpot> chartData = [];
  bool isLoadingChart = true;

  double livePrice = 0;
  double liveChange = 0;

  String selectedTime = "LIVE";

  Timer? priceTimer;

  // 🔥 NEW TX STATE
  List<Map<String, dynamic>> transactions = [];
  bool isLoadingTx = true;

  @override
  void initState() {
    super.initState();

    livePrice = widget.price;
    liveChange = widget.change;

    loadChart();
    startLivePrice();
    loadTransactions(); // 🔥 ADD
  }

  @override
  void dispose() {
    priceTimer?.cancel();
    super.dispose();
  }

  // ============================
  // 🔥 LIVE PRICE
  // ============================

  void startLivePrice() {
    priceTimer = Timer.periodic(const Duration(seconds: 3), (_) async {

      final prices = await WalletService.getLivePricesAdvanced(
        [
          {
            "symbol": widget.symbol,
            "contract": widget.contract,
            "isNative": widget.isNative,
          }
        ],
        widget.network,
      );

      if (!mounted) return;

      setState(() {
        livePrice = prices[widget.symbol]?["price"] ?? livePrice;
        liveChange = prices[widget.symbol]?["change"] ?? liveChange;
      });
    });
  }

  // ============================
  // 🔥 LOAD TX
  // ============================

  Future<void> loadTransactions() async {

    setState(() => isLoadingTx = true);

    try {

      final txs = await WalletService.getTransactionHistory(
        address: widget.walletAddress,
        network: widget.network,
        contract: widget.isNative ? "" : widget.contract,
      );

      if (!mounted) return;

      setState(() {
        transactions = txs;
        isLoadingTx = false;
      });

    } catch (e) {
      setState(() => isLoadingTx = false);
    }
  }

  // ============================
  // 🔥 TIMEFRAME
  // ============================

  String getInterval() {
    switch (selectedTime) {
      case "LIVE":
      case "1m":
        return "1m";
      case "15m":
        return "15m";
      case "1H":
        return "1h";
      case "1D":
        return "1d";
      case "1W":
        return "1w";
      case "1M":
        return "1M";
      default:
        return "1m";
    }
  }

  // ============================
  // 🔥 CHART
  // ============================

  Future<void> loadChart() async {

    setState(() => isLoadingChart = true);

    try {
      final pair = "${widget.symbol.toUpperCase()}USDT";
      final interval = getInterval();

      final url = Uri.parse(
        "https://api.binance.com/api/v3/klines?symbol=$pair&interval=$interval&limit=120",
      );

      final res = await http.get(url);
      final data = jsonDecode(res.body);

      List<FlSpot> spots = [];

      for (int i = 0; i < data.length; i++) {
        final candle = data[i];
        final close = double.parse(candle[4]);
        spots.add(FlSpot(i.toDouble(), close));
      }

      if (!mounted) return;

      setState(() {
        chartData = spots;
        isLoadingChart = false;
      });

    } catch (e) {
      setState(() => isLoadingChart = false);
    }
  }

  // ============================
  // 🔥 HELPERS
  // ============================

  String shortAddress(String addr) {
    if (addr.length < 10) return addr;
    return "${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}";
  }

  String formatTime(DateTime time) {
    final now = DateTime.now();
    final diff = now.difference(time);

    if (diff.inMinutes < 1) return "Just now";
    if (diff.inMinutes < 60) return "${diff.inMinutes}m ago";
    if (diff.inHours < 24) return "${diff.inHours}h ago";

    return "${time.day}/${time.month}";
  }

  // ============================
  // UI
  // ============================

  @override
  Widget build(BuildContext context) {

    final usdValue = widget.balance * livePrice;

    final iconPath = WalletService.resolveLocalIcon(widget.symbol);

    final fallbackUrl = WalletService.resolveFallbackIcon(
      network: widget.network,
      contract: widget.contract,
      isNative: widget.isNative,
    );

    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [

            CircleAvatar(
              radius: 16,
              backgroundColor: Colors.white,
              child: ClipOval(
                child: SvgPicture.asset(
                  iconPath,
                  width: 22,
                  height: 22,
                  errorBuilder: (_, __, ___) {
                    return Image.network(
                      fallbackUrl,
                      width: 22,
                      height: 22,
                      errorBuilder: (_, __, ___) =>
                          const Icon(Icons.currency_bitcoin, size: 20),
                    );
                  },
                ),
              ),
            ),

            const SizedBox(width: 8),
            Text(widget.symbol),
          ],
        ),
      ),

      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [

            Text(
              "\$${livePrice.toStringAsFixed(4)}",
              style: const TextStyle(fontSize: 26, fontWeight: FontWeight.bold),
            ),

            const SizedBox(height: 5),

            Text(
              "${liveChange >= 0 ? "+" : ""}${liveChange.toStringAsFixed(2)}%",
              style: TextStyle(
                color: liveChange >= 0 ? Colors.green : Colors.red,
              ),
            ),

            const SizedBox(height: 20),

            SizedBox(
              height: 220,
              child: Stack(
                alignment: Alignment.center,
                children: [

                  if (chartData.isNotEmpty)
                    LineChart(
                      LineChartData(
                        minY: chartData.map((e) => e.y).reduce((a, b) => a < b ? a : b),
                        maxY: chartData.map((e) => e.y).reduce((a, b) => a > b ? a : b),
                        gridData: FlGridData(show: false),
                        titlesData: FlTitlesData(show: false),
                        borderData: FlBorderData(show: false),
                        lineBarsData: [
                          LineChartBarData(
                            spots: chartData,
                            isCurved: false,
                            barWidth: 2,
                            color: const Color(0xFF00AEEF),
                            dotData: FlDotData(show: false),
                          ),
                        ],
                      ),
                    ),

                  if (isLoadingChart)
                    const CircularProgressIndicator(),
                ],
              ),
            ),

            const SizedBox(height: 25),

            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _btn(Icons.send, "Send", () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) => SendScreen(
                        walletAddress: widget.walletAddress,
                      ),
                    ),
                  );
                }),
                _btn(Icons.download, "Receive", () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) => ReceiveScreen(
                        walletAddress: widget.walletAddress,
                      ),
                    ),
                  );
                }),
              ],
            ),

            const SizedBox(height: 30),

            const Align(
              alignment: Alignment.centerLeft,
              child: Text(
                "Transaction History",
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            ),

            const SizedBox(height: 10),

            // 🔥 REAL TX LIST
            if (isLoadingTx)
              const Padding(
                padding: EdgeInsets.all(20),
                child: CircularProgressIndicator(),
              )
            else if (transactions.isEmpty)
              const Padding(
                padding: EdgeInsets.all(20),
                child: Text(
                  "No Transactions Found",
                  style: TextStyle(color: Colors.grey),
                ),
              )
            else
              ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: transactions.length,
                itemBuilder: (_, i) {
                  final tx = transactions[i];

                  final isSent = tx["isSent"] == true;
                  final value = tx["value"];
                  final time = tx["time"];
                  final status = tx["status"];

                  return ListTile(
                    contentPadding: EdgeInsets.zero,

                    leading: CircleAvatar(
                      backgroundColor:
                          isSent ? Colors.red.withOpacity(0.1) : Colors.green.withOpacity(0.1),
                      child: Icon(
                        isSent ? Icons.arrow_upward : Icons.arrow_downward,
                        color: isSent ? Colors.red : Colors.green,
                      ),
                    ),

                    title: Text(
                      isSent ? "Sent" : "Received",
                      style: const TextStyle(fontWeight: FontWeight.w600),
                    ),

                    subtitle: Text(
                      "${shortAddress(tx["to"])} • ${formatTime(time)}",
                      style: const TextStyle(fontSize: 12),
                    ),

                    trailing: Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(
                          "${isSent ? "-" : "+"}$value ${widget.symbol}",
                          style: TextStyle(
                            color: isSent ? Colors.red : Colors.green,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Icon(
                          status ? Icons.check_circle : Icons.pending,
                          size: 14,
                          color: status ? Colors.green : Colors.orange,
                        )
                      ],
                    ),
                  );
                },
              ),
          ],
        ),
      ),
    );
  }

  Widget _btn(IconData icon, String label, VoidCallback onTap) {
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
