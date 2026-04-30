# 🚀 AWS EC2 Nginx Deployment

This project demonstrates how to deploy a static website on AWS EC2 using Nginx, applying real-world cloud infrastructure concepts.

---

## 🧠 Objective

Build and deploy a production-like static web server using AWS EC2 and Nginx, applying basic cloud infrastructure principles such as network exposure, security configuration, and service management.

---

## ⚙️ Implementation Steps

1. Provisioned an EC2 instance (Amazon Linux 2023)
2. Configured Security Groups:
   - Port 22 (SSH) → restricted access
   - Port 80 (HTTP) → public access
3. Installed and configured Nginx
4. Enabled Nginx as a system service
5. Deployed a custom static HTML page
6. Validated service availability via public IP

---

## 🌐 Architecture

User → Internet → AWS EC2 (Public IP) → Nginx → Static Website

### Components

- EC2 Instance (Amazon Linux 2023)
- Nginx Web Server
- Security Group (controlled inbound traffic)
- Public IP for web access

---

## 🛠️ Tech Stack

- AWS EC2
- Amazon Linux 2023
- Nginx
- SSH

---

## 📸 Proof of Work

### 🟢 EC2 Running
![EC2](screenshots/ec2-running.png)

### 🔐 Security Group (HTTP + SSH)
![Security](screenshots/security-group.png)

### ⚙️ Nginx Running
![Nginx](screenshots/nginx-running.png)

### 🌐 Live Website
![Website](screenshots/website-live.png)

---

## 🌍 Live Demo

Public access via EC2 instance:

http://13.220.67.89

> ⚠️ Note: Instance availability may vary depending on whether it is running or stopped.

---

## ⚡ Commands Used

```bash
sudo dnf install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx