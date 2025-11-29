# Alibaba Cloud Setup Research

## Account Registration Process

### International Account (alibabacloud.com)
1. Navigate to https://www.alibabacloud.com
2. Click "Free Account" or "Sign Up"
3. Provide email address or phone number
4. Verify identity (email/SMS verification)
5. Complete real-name verification (passport or ID)
6. Add payment method (credit card)

### China Site vs International Site
- **International Site**: alibabacloud.com (recommended for global users)
- **China Site**: aliyun.com (requires Chinese business license for ICP filing)

## ECS (Elastic Compute Service) Setup

### Basic Steps
1. Log into Alibaba Cloud Console
2. Navigate to Elastic Compute Service (ECS)
3. Create Instance:
   - Select region (e.g., Japan, Singapore, US)
   - Choose instance type (e.g., ecs.t5-lc1m1.small for testing)
   - Select OS (Ubuntu, CentOS, etc.)
   - Configure security groups (ports 80, 443, 22)
   - Set root password
4. Launch instance
5. Get public IP address

### Pricing
- Pay-as-you-go or subscription
- Starting from ~$5-10/month for basic instances

## Domain Connection Methods

### Method 1: Point External Domain to Alibaba Cloud ECS
1. Get ECS public IP address from Alibaba Cloud Console
2. Log into domain registrar (Netim/Cloudflare)
3. Add A record:
   - Type: A
   - Name: @ (for root domain) or www
   - Value: ECS public IP
   - TTL: 3600
4. Wait for DNS propagation (5 minutes to 48 hours)

### Method 2: Use Alibaba Cloud DNS
1. Add domain to Alibaba Cloud DNS console
2. Get Alibaba Cloud nameservers
3. Update nameservers at domain registrar
4. Configure DNS records in Alibaba Cloud DNS

### Method 3: Keep Cloudflare DNS (Recommended for PerpX)
1. Keep Cloudflare as DNS manager
2. Add A record pointing to Alibaba Cloud ECS IP
3. Benefit from Cloudflare CDN, SSL, DDoS protection

## Web Hosting Setup

### Static Website (OSS)
- Use Object Storage Service (OSS)
- Similar to AWS S3
- Enable static website hosting
- Connect custom domain

### Dynamic Website (ECS)
- Install web server (Nginx, Apache)
- Deploy application code
- Configure SSL certificate (Let's Encrypt)
- Point domain A record to ECS IP

## Key Considerations

### ICP Filing (China Mainland Only)
- Required if hosting in China mainland regions
- Not required for Hong Kong, Singapore, Japan, US regions
- Process takes 20-30 days

### SSL Certificate
- Free SSL from Let's Encrypt
- Or purchase from Alibaba Cloud

### Security Groups
- Configure firewall rules
- Allow ports: 80 (HTTP), 443 (HTTPS), 22 (SSH)

## Sources
- https://www.alibabacloud.com/help/en/account/step-1-register-an-alibaba-cloud-account
- https://www.alibabacloud.com/help/en/ecs/getting-started/quick-start
- https://help.shopline.com/hc/en-001/articles/900004784386-Guide-to-Connecting-Your-Alibaba-Cloud-Domain
