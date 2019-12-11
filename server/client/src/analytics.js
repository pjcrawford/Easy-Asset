var PortfolioAnalytics = require('portfolio-analytics');

var ui = PortfolioAnalytics.ulcerIndex([100, 110, 105, 102, 95]);
// ui == 0.07204222820421435

PortfolioAnalytics.sharpeRatio([100, 110, 105, 107.5, 115], [100, 100, 100, 100, 100]); 
// The Sharpe ratio

console.log(sharpeRatio);