# LGSI INTERNSHIP - Smart AI Air Conditioner : Frontend

## Main UI
![Main UI](https://github.com/2024-LGSI-Internship/frontend-react-ts/assets/42794553/42898f2f-b3d1-423c-8328-63f9d8786097)

## System Architecture and Service Pipelines
![System Architecture](https://github.com/2024-LGSI-Internship/frontend-react-ts/assets/42794553/91f355fe-c510-41a7-9691-4bc7d322ef5d)

![Service Pipelines](https://github.com/2024-LGSI-Internship/frontend-react-ts/assets/42794553/be84afb2-ccfc-41ee-863b-c2a835ffd8b1)

## Used Skill Stacks
- React
- React-Redux, Redux-Thunk
- Typescript, HTML, SCSS
- http-proxy-middleware
- Bootstrap 5
- Chart.js

## Frontend Architecture
![Frontend Architecture](https://github.com/2024-LGSI-Internship/frontend-react-ts/assets/42794553/8fe3b24b-4f34-4bb9-a5fb-fa7c6772073e)

## Key Features
### Interface
1. **Display Air Conditioner Information**
   - Air conditioner information: `userTemp, userMode, userDate, userTime, userWindStrength, userWindAngle`
   - Current information: `curHumid, curTemp`
   - Fetch air conditioner information from the server using GET
   - Global state management through `StatusReducer.ts`

2. **Remote Control Functionality**
   - Modify currently operating air conditioner information by pressing buttons (e.g., changing temperature)
   - Update information in `StatusReducer.ts` and POST to the server for storage

3. **Chatbot Functionality**
   - Conversations with a chatbot through chat messages
   - POST questions to a general QnA server and receive responses
   - POST base64-based image data to a Vision AI server for air conditioner classification and analysis
   - Global state management through `ChatReducer.ts`

4. **Reservation Calendar**
   - Users can manually select dates on the calendar to schedule air conditioner operating times
   - Global state management through `Calendar.ts`

### Dashboard
   - Fetch model prediction results from the server using GET and visualize them using Chart.js as a Line Chart
   - Display information in `Status.tsx` during prediction initiation based on prediction data
   - Fetch user information from the server again after prediction completion

## Backend Data Communication
### Data to Receive
   - Air conditioner information (GET Response) - Managed by `StatusReducer.ts`
   - Chatbot response results (POST Response) - Managed by `ChatReducer.ts`
   - Prediction model results (GET Response) - Managed by `DashboardReducer.ts`
### Data to Send
   - Controller.tsx modification results (POST) - Managed by `StatusReducer.ts`
   - User questions for the chatbot (POST) - Managed by `ChatReducer.ts`
   - ~~Calendar reservation data (Backend transmission of manually registered operating times)~~ (Not implemented)

   - Asynchronous communication implemented using Redux-thunk within Redux

## Data State Management Structure
### Global State Management (Redux)
   - `PageReducer.ts`
     - Manages page numbers in `Interface.tsx`, globally for future page references

   - `StatusReducer.ts`
     - Manages air conditioner information (user, cur) data

   - `ChatReducer.ts`
     - Manages chat history (questions/answers)

   - `CalendarReducer.ts`
     - Manages manually registered air conditioner operating data - date/time and air conditioner information

   - `DashboardReducer.ts`
     - Stores prediction result in an array data type

## UI/UX
   - Utilizing Bootstrap 5, SCSS
   - Implemented as a web app (webapp)
   - Two main components in `App.tsx`: `Interface.tsx, Dashboard.tsx`
     - View Status - `Status.tsx`
     - Remote Controller - `Controller.tsx`
     - AI Chat - `Chat.tsx`
     - View Calendar - `Calendar.tsx`
     - Data Visualization - `Dashboard.tsx`

## requirements
- `npm i react-scripts axios @types/http-proxy-middleware`
- `npm i @reduxjs/toolkit react-redux`
- `npm i @types/node @types/react @types/react-dom @types/jest`
- `npm i node-sass`
- `npm i react-chartjs-2 chart.js`