# DH Lottery Automation

Personal lottery auto-purchase system for weekly automation.

## Project Overview

This project automates the weekly purchase of lottery tickets, eliminating the need for manual intervention. Currently configured to purchase 5 tickets (1,000 KRW each) every Sunday at 9:00 AM KST.

## Features

### Current Implementation

- **Automated Purchase**: 5 lottery tickets weekly
- **Schedule**: Every Sunday at 9:00 AM KST
- **Cost**: 1,000 KRW per ticket (5,000 KRW total weekly)
- **GitHub Actions Integration**: Fully automated via CI/CD

### Planned Features

- **Telegram Bot Integration**: Switch between auto/manual modes
- **Public Service**: Share with others via Telegram bot (if no issues arise)
- **Auto-Deposit Logic**: Automatic balance management when needed

## Technology Stack

- **Runtime**: Node.js 22
- **Package Manager**: pnpm
- **Automation**: GitHub Actions
- **Web Automation**: Playwright
- **Build Tool**: SWC
- **Code Quality**: Biome

## Installation and Setup

### Prerequisites

- Node.js 22+
- pnpm
- DH Lottery account

### Environment Variables

Create a `.env` file with your credentials:

```env
DHLOTTERY_ID=your_lottery_id
DHLOTTERY_PASSWORD=your_password
```

### Installation

```bash
# Install dependencies
pnpm install

# Build project
pnpm run build

# Run locally
pnpm start
```

## GitHub Actions Setup

### Repository Secrets

Add the following secrets in GitHub repository settings:

- `DHLOTTERY_ID`: Your lottery account ID
- `DHLOTTERY_PASSWORD`: Your lottery account password

### Workflow

The automation runs via GitHub Actions:

- **Scheduled**: Every Sunday at 9:00 AM KST
- **Manual**: Can be triggered manually via GitHub Actions interface

## Usage

### Automatic Mode (Default)

The system automatically purchases 5 lottery tickets every Sunday at 9:00 AM KST.

### Manual Execution

1. Go to GitHub Actions tab in your repository
2. Select "DH Lottery Automation" workflow
3. Click "Run workflow"

## Purchase Details

- **Frequency**: Weekly (Sunday)
- **Time**: 9:00 AM KST
- **Quantity**: 5 tickets
- **Weekly Cost**: 5,000 KRW
- **Annual Cost**: ~260,000 KRW

## Future Roadmap

- [ ] **Telegram Bot Integration**: Enable auto/manual mode switching with notifications
- [ ] **Win/Loss Notifications**: Real-time lottery result alerts via Telegram
- [ ] **Public Service**: Allow others to use the system via Telegram bot
- [ ] **Auto-Deposit System**: Automatic balance management when funds are low
- [ ] **Purchase History**: Track and analyze lottery purchase patterns
- [ ] **Multi-User Support**: Handle multiple users with individual settings
- [ ] **Win/Loss Analytics**: Statistics and reporting for lottery outcomes

## Disclaimer

This project is for personal use and educational purposes. Please gamble responsibly and be aware of the risks involved in lottery participation.

## License

This project is for personal use only.

## Contributing

This is a personal project, but suggestions and improvements are welcome via issues.
