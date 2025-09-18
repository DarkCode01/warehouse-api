<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">App that helps warehouse teams decide which locations (“bins”) to audit
first when checking inventory.</p>


## Project setup

```bash
$ yarn install
```

## Database migrations and seeders

```bash
# add DATABASE_URL to .env 

# run migrations
$ npx prisma migrate dev

# run seeders
yarn run db:seed
```

## Run Api

```bash
# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## [Api Documentation](http://localhost:3000/api#/)
![Alt Text](/assets/doc.png "Rivero 2.0 Database swagger")


## Database Schema
![Alt Text](/assets/database.png "Rivero 2.0 Database Schema")

### Core Structure Tables

* `warehouses` - Main warehouse facilities that contain all other entities
* `aisles` - Corridors within warehouses (like grocery store aisles)
* `racks` - Shelving units within each aisle
* `bins` - Individual storage locations on racks (the smallest storage unit)

### Activity Tracking Tables

* `bin_activities` - Logs all warehouse activities (putaway, pick, move, adjustment, audit) for each bin

### Audit Management Tables

* `audit_plans` - Collections of bins that need to be audited (like "High Risk Bins Plan #001")
* `audit_tasks` - Individual bins assigned to be audited within a plan
* `audit_results` - Records of completed audits showing expected vs actual counts and pass/fail status

## Risk Score Calculation Table

### **Scoring Formula**
```
Risk Score = MIN(100, Audit Factor (50%) + Activity Factor (30%) + Adjustment Factor (20%))
```

### **Unit Values**

| Factor | Unit | Points per Unit | Max Points | Formula |
|:------:|:----:|:---------------:|:----------:|:-------:|
| **Audit** | Days without audit | **0.8** | 50 | `days × 0.8` |
| **Activity** | Activities/month | **2.0** | 30 | `activities × 2` |
| **Adjustment** | Adjustments/month | **8.0** | 20 | `adjustments × 8` |

---

### **Risk Classifications**

| Score Range | Level | Color | Action |
|:-----------:|:-----:|:-----:|:------:|
| 0-30 | Low | 🟢 | Low |
| 31-70 | Medium | 🟡 | Medium |
| 71-100 | Critical | 🔴 | Hight |

---

###  **Quick Reference Examples**

| Days | Activities | Adjustments | Score | Level |
|:----:|:----------:|:-----------:|:-----:|:-----:|
| 10 | 5 | 0 | **18** | 🟢 Low |
| 25 | 8 | 1 | **44** | 🟡 Medium |
| 45 | 12 | 2 | **76** | 🔴 Hight |

---

## **Key Thresholds**

- **Audit Factor**: 63+ days = Max points (50)
- **Activity Factor**: 15+ activities = Max points (30)  
- **Adjustment Factor**: 3+ adjustments = Max points (20)
- **Never audited**: Treated as 90 days

## Stay in touch

- Author - [Jose Segura](https://josesp.me)