const Url = require('../models/Url');

exports.createUrl = async (req, res) => {
  try {
    // Dynamically import nanoid
    const { nanoid } = await import('nanoid');

    const { originalUrl } = req.body;
    const shortUrl = nanoid(8); // Generate a short URL with 8 characters

    const newUrl = new Url({
      originalUrl,
      shortUrl,
      createdBy: req.user.id,
    });

    await newUrl.save();
    res.status(201).json({ shortUrl: newUrl.shortUrl });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUrls = async (req, res) => {
  try {
    const urls = await Url.find({ createdBy: req.user.id });
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUrlCount = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const urlCount = await Url.countDocuments({
      createdBy: req.user.id,
      createdAt: { $gte: today },
    });

    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    const urlCountMonth = await Url.countDocuments({
      createdBy: req.user.id,
      createdAt: { $gte: monthStart },
    });

    res.status(200).json({ count: urlCount, countMonth: urlCountMonth });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
