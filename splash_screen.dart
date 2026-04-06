// app/lib/screens/splash_screen.dart

import 'dart:async';
import 'package:flutter/material.dart';
import '../core/storage_service.dart';
import '../core/app_shell.dart';
import 'onboarding_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {

  @override
  void initState() {
    super.initState();
    _initApp();
  }

  Future<void> _initApp() async {
    try {

      // 🔥 Smooth splash delay
      await Future.delayed(const Duration(seconds: 2));

      // 🔥 GET WALLET SAFE
      final wallet = await StorageService.getSelectedWallet();

      // 🔥 GET NETWORK (IMPORTANT FOR APP SHELL)
      final network = await StorageService.getSelectedNetwork();

      if (!mounted) return;

      // 🔥 VALID WALLET CHECK
      if (wallet != null &&
          wallet["address"] != null &&
          wallet["address"].toString().isNotEmpty) {

        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (_) => AppShell(
              walletAddress: wallet["address"],
              network: network, // 🔥 FIX: network pass
            ),
          ),
        );

      } else {

        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (_) => const OnboardingScreen(),
          ),
        );
      }

    } catch (e) {

      // 🔥 FAIL SAFE (CRASH PREVENTION)
      if (!mounted) return;

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (_) => const OnboardingScreen(),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,

        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Color(0xFF3375BB),
              Color(0xFF4A90E2),
            ],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),

        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [

            // 🔥 APP LOGO
            Image.asset(
              'assets/icon.png',
              width: 110,
            ),

            const SizedBox(height: 20),

            // 🔥 APP NAME
            const Text(
              "NexPoket",
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                color: Colors.white,
                letterSpacing: 1,
              ),
            ),

            const SizedBox(height: 8),

            // 🔥 TAGLINE
            const Text(
              "Smart Digital Wallet",
              style: TextStyle(
                fontSize: 14,
                color: Colors.white70,
              ),
            ),

            const SizedBox(height: 30),

            // 🔥 LOADER
            const CircularProgressIndicator(
              color: Colors.white,
              strokeWidth: 2,
            ),
          ],
        ),
      ),
    );
  }
}
