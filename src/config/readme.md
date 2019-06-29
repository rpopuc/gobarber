# Applilcation Configuration

## Authentication

`auth.js`

```javascript
export default {
  secret: '<Secret string>',
  expiresIn: '<Time to expire. For example: 1d>=',
};
```

## Database

`database.js`

```javascript
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'username',
  password: 'password',
  database: 'database',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
```
