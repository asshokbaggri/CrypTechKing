import express from 'express';
import Alert from '../models/Alert.js';

const router = express.Router();

/**
 * GET latest alerts (with filters)
 * Supported query params:
 *  - coin=BTC
 *  - tier=ULTRA_WHALE | MEGA_WHALE | WHALE
 *  - blockchain=bitcoin | ethereum | tron | ripple
 */
router.get('/alerts', async (req, res) => {
  try {
    const { coin, tier, blockchain } = req.query;

    const query = {};

    if (coin) {
      query.coin = coin.toUpperCase();
    }

    if (tier) {
      query.tier = tier.toUpperCase();
    }

    if (blockchain) {
      query.blockchain = blockchain.toLowerCase();
    }

    const alerts = await Alert.find(query)
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      count: alerts.length,
      data: alerts
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

/**
 * GET single alert by ID (DETAIL VIEW)
 */
router.get('/alerts/:id', async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found'
      });
    }

    res.json({
      success: true,
      data: alert
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

export default router;
