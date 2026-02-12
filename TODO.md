- [x] Add state for candidateData (UserModel | null), loading (boolean), error (string | null)
- [x] Add useEffect to fetch candidate data: if no id, use user data mapped to UserModel; if id, call CandidateService.getUser(id)
- [x] Update component to render based on loading/error/candidateData states
- [x] Use candidateData for all fields, including workExperience and educationHistory
- [x] Fix profile initials display to use candidateData.initials
- [x] Remove mock data logic and unused imports
- [x] Add loading spinner and error message UI

Integration completed successfully. The CandidateDetailPage now fetches real candidate data from the backend API, handles loading/error states, and displays comprehensive candidate information including work experience and education history.
