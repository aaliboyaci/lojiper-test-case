# lojiper-test-case

Lojiper Web Application Test Case

## General Description

This document contains the details and requirements of the "Lojiper Web Application Test Case," a technical test prepared for Lojiper.

## Project Objectives

The objective of this project is to develop a bus ticket sales application using NextJS, TypeScript, and Context API. The application enables users to log in/register and then search for bus trips, select seats, and purchase tickets for the selected trips.

## Live Demo

You can test the live demo from the link below. In the subsequent sections of this document, sample journey and user data have been provided. You can follow those data for testing purposes.

<a href="https://lojiper-test-case.vercel.app/" target="_blank">LIVE DEMO LINK</a>

`https://lojiper-test-case.vercel.app/`

It has been deployed by using Vercel.

## Technical Details

- Technologies Used: React (18.2.0), NextJS (13.4.19), TypeScript, Context API, NextJS API Routes, ESLint (8.47.0), Axios (1.4.0)
- The application has been developed following the principles of a three-layer architecture in software design philosophy. This approach aims to ensure the separation of concerns, thereby facilitating potential enhancements, maintenance, and unit testing of the application. As a result, a foundation has been established that will facilitate ease of future development, maintenance, and unit testing while adhering to the "separation of concerns" principle.
- Trip Data: Trip data is obtained using static JSON files as the basis and is fetched using NextJS API Routes and Axios.
- Bus Layout: The bus layout consists of 2 rows of double seats. Occupied seats are indicated with gender icons or colors.
- Seat Selection: Users can select a maximum of 5 seats. Since user login is mandatory, seats cannot be selected next to the opposite gender.
- Toast Messages: Toast messages are used to display successful results, error messages, or warnings throughout the application.

## Application Pages and Features

### 1. Login Page

- Users can log in with their username and password.
- Upon successful login, users are redirected to the homepage.
- In case of unsuccessful login, an error message is displayed.
- First-time users are directed to the registration page.

### 2. Registration Page

- Users can enter their information (email, password, first name, last name, gender, birthdate).
- Upon successful registration, users are directed to the login page.

### 3. Homepage

- Departure city, arrival city, and date information are entered.
- Inputs are mandatory, and a warning message is displayed if any are missing.
- Trips are listed using the "Search" button.
- If there are no available trips, a warning is displayed.
- Trip details (departure-arrival cities, date, available seats, price) are shown.

### 4. Ticket Sales Page

- Trip details and price are displayed.
- Seat selection is possible.
- Occupied seats display the gender of the occupant ("K" or "E").
- A maximum of 5 seats can be selected, and selecting a 6th seat triggers a warning.
- If adjacent seats are not selected together, users cannot sit next to the opposite gender. In this case, a warning is displayed, and the seat cannot be selected.
- The total amount area updates as seat selections are made.
- If the user does not select seats, they cannot proceed to the payment page and receive a warning message.
- The user must enter mandatory passenger information for each selected seat, otherwise a warning message will be given.

### 5. Payment Page

- The total amount is displayed.
- A payment form is filled out and confirmed.
- If the form information is incomplete, a warning is displayed.
- If the payment is successful, a spinner is displayed for a brief moment (a failed payment scenario was not requested for this use case).
- In case of a successful payment, a "Return to Homepage" button and a success message are shown.

## Example User Data

A total of 3 predefined user data have been created. With these data, you can log in to the application without registering and test it.

Username: ahmety
Password: 12345

Username: elifk
Password: 67890

Username: cemoz
Password: 43210

## Example Travel Data

A total of 8 sample travel data have been generated. For queries outside of these dates and destinations, users will be met with the message "Uygun sefer bulunamadı"

10 October 2023
İstanbul > İzmir
İstanbul > Antalya
Ankara > İzmir
Ankara > Antalya

11 October 2023
İstanbul > İzmir
İstanbul > Antalya
Ankara > İzmir
Ankara > Antalya

## Screenshots

<img src="https://github.com/aaliboyaci/lojiper-test-case/blob/main/screen-shots/1.jpg" alt="screenshots" width="800">
<img src="https://github.com/aaliboyaci/lojiper-test-case/blob/main/screen-shots/2.jpg" alt="screenshots" width="800">
<img src="https://github.com/aaliboyaci/lojiper-test-case/blob/main/screen-shots/3.jpg" alt="screenshots" width="800">

## Installation and Running

1.  **Clone the Repository to Your Computer:**

    - To clone the project, go to the project's page on GitHub.
    - In the top right corner, find and click the green "Code" button.
    - From the dropdown menu, select "Download ZIP" to download the project as a ZIP file.
    - Extract the downloaded ZIP file to a folder.

2.  **Navigate to the Main Directory of the Project in the Terminal:**

    - Open a terminal or command prompt on your computer.
    - Use the `cd` command to navigate to the main folder of the cloned project. For example, type `cd lojiper-test-case` (if you are inside the main folder, make sure you are in the right place by using the `cd` command twice).

3.  **Install the Required Dependencies Using the `npm install` Command:**

    - Make sure you are in the main project folder in the terminal.
    - To install the required dependencies of the project, enter the following command and press Enter:

      `npm install`

    - This command will install the dependencies listed in the project's package.json file. An active internet connection is required.

4.  **Use the `npm run dev` Command to Start the Project:**

    - Once the dependencies are installed, enter the following command in the terminal and press Enter:

      `npm run dev`

    - This command will start the project in development mode.

5.  **Go to `http://localhost:3000` in Your Browser to View the Application:**

    - When the project is successfully running, open your web browser.
    - Type `http://localhost:3000` in the address bar and press Enter.
    - This address will display the locally running application that was cloned and set up.
