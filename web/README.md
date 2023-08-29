# route to do in ESP32

## GET /device

### types
```typescript
type MinMax = {
  min?: number;
  max: number;
};
```

### output 
```typescript
type output = {
  deviceName: string;
  deviceModel: string;
  ipAddress: string;
  alertMail: string;
  wifiPass: string;
  consommationTotale: MinMax;
  consommationSwitchA: MinMax;
  consommationSwitchV: MinMax;
  consommationAuxW: MinMax;
  consommationAuxV: MinMax;
  batteryReserv: MinMax;
}
```

## GET /data

### output 
```typescript
type output = {
  consommationTotale: number;
  consommationSwitchA: number;
  consommationSwitchV: number;
  consommationAuxW: number;
  consommationAuxV: number;
  batteryReserv: number;
  nbCharge: number;
  lastCharge: number;
  autonomie: number;
}
```

## GET /logs

### types
```typescript
type Log = {
  time: Date;
  message: string;
  level: "ALERT" | "WARNING" | "INFO";
};
```

### output 
```typescript
type output = Log[];
```

## POST /config

### input 
```typescript
type input = {
  deviceName: string;
  ipAddress: string;
  alertMail: string;
  wifiPass: string;
};
```

## GET /reboot
reboot the ESP32

## POST /login
login user
### input 
```typescript
type input = {
  username: string;
  password: string;
};
```
### output 
```typescript
type output = "superAdmin"|"admin"|"notAuthenticated";
```

## GET /logout
logout user

## POST /changepassword
change user password
### input 
```typescript
type input = {
  oldPassword: string;
  newPassword: string;
};
```
### output 
HTTP 200 if ok, else return 403

