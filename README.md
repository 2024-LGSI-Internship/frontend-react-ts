# LGSI INTERNSHIP - Smart AI Air Conditioner : Frontend

## Used Skill Stacks
- React
- React-Redux, Redux-Thunk
- Typescript, HTML, SCSS
- http-proxy-middleware
- Bootstrap 5
- Chart.js

## FE Plans
- **Listing Required Features**
    1. Listing Air Conditioner Information
        - Air Conditioner Information: userTemp, userMode, userDate, userTime, userWindStrength, userWindAngle
        - Current Information (Arduino): curHumid, curTemp
    2. Remote Control Function
        - Modify currently running air conditioner information by pressing buttons (e.g., temperature change)
    3. Chatbot Function
        - Conversation with the chatbot through chat
            - FAQ questions, attachment of air conditioner model pictures
    4. Reservation Calendar
        - Show recommended operating time slots based on AI learning through the calendar date.
        - Allow users to manually reserve air conditioner operating time by clicking on the date in the calendar.
- **Choosing Programming Tools/Frameworks**
    - Planning to use React.js for frontend implementation; componentizing each page makes frontend implementation easy.
- **Deciding Data to Receive and Send from Backend**
    - Data to Receive
        - Air conditioner information (received in JSON format for frontend state management)
        - Chatbot response results
        - Calendar data (display AI recommended time slots)
    - Data to Send
        - Remote control button presses: setTemp, setMode, setWindStrength, setWindAngle changes
        - Chatbot communication: FAQ answers, model description (image recognition)
        - Calendar reservation data (manually registered reservation operating time sent to the backend)
    - Using Redux-thunk for Asynchronous Communication in Redux
- **Designing Data State Management Structure**
    - Global State Management (Redux)
        - Air conditioner information (user, cur) data
        (Displayed in **`Status.tsx`**, updated in **`Controller.tsx`**, sent after update)
        - Manually registered air conditioner operating data - date/time
        (Displayed in **`Calendar.tsx`**, also displayed in **`Status.tsx`**)
    - Local State Management (State)
        - Chatbot send/receive data (conversation history)
- **Designing UI (Design) and Implementation**
    - Planning to implement in web app format
    - Four pages
        - View Status - **`Status.tsx`**
        - Remote Controller - **`Controller.tsx`**
        - AI Chat - **`Chat.tsx`**
        - View Calendar - **`Calendar.tsx`**

## requirements
- `npm i react-scripts axios @types/http-proxy-middleware`
- `npm i @reduxjs/toolkit react-redux`
- `npm i @types/node @types/react @types/react-dom @types/jest`
- `npm i node-sass`
- `npm i react-chartjs-2 chart.js`