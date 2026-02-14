import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const healthCheckController = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(
      200,
      {
        status: 'ok',
        uptime: process.uptime(), // seconds server running
        timestamp: Date.now(),
        memoryUsage: process.memoryUsage().rss, // RAM used
      },
      'Server is running',
    ),
  );
});
