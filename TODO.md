# Authentication Integration TODO

- [ ] Update ApiSetter.ts: Change baseURL to "http://localhost:5000", standardize token key to "token"
- [ ] Update Auth.Service.tsx: Adjust userAuth interface to match backend model; ensure methods call correct endpoints and handle responses
- [ ] Update AuthContext.tsx: Replace mock login/register with real calls to userService; handle token storage and user state
- [ ] Remove Auth.Setup.tsx (redundant with ApiSetter)
- [ ] Check and update dependent files (e.g., LoginPage, RegisterPage) if needed
- [ ] Test login/register functionality
- [ ] Update forms if field names differ (e.g., PhoneNumber vs phone)
