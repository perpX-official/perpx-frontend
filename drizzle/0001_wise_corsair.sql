CREATE TABLE `points_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`walletAddress` varchar(128) NOT NULL,
	`transactionType` enum('connect_bonus','x_connect','discord_connect','daily_post','referral_bonus','other') NOT NULL,
	`pointsChange` int NOT NULL,
	`balanceAfter` int NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `points_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `task_completions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`walletAddress` varchar(128) NOT NULL,
	`taskType` varchar(64) NOT NULL,
	`pointsAwarded` int NOT NULL,
	`completionDate` varchar(10),
	`metadata` text,
	`completedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `task_completions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wallet_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`walletAddress` varchar(128) NOT NULL,
	`chainType` enum('evm','tron','solana') NOT NULL,
	`totalPoints` int NOT NULL DEFAULT 0,
	`connectBonusClaimed` boolean NOT NULL DEFAULT false,
	`xConnected` boolean NOT NULL DEFAULT false,
	`xUsername` varchar(64),
	`xConnectedAt` timestamp,
	`discordConnected` boolean NOT NULL DEFAULT false,
	`discordUsername` varchar(64),
	`discordConnectedAt` timestamp,
	`referralCode` varchar(16),
	`referredBy` varchar(16),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `wallet_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `wallet_profiles_walletAddress_unique` UNIQUE(`walletAddress`),
	CONSTRAINT `wallet_profiles_referralCode_unique` UNIQUE(`referralCode`)
);
