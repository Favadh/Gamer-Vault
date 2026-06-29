


Muthoot Institute of Technology & Science
## Varikoli P O, Puthencruz, Ernakulam District, Kerala
(Affiliated to A P J Abdul Kalam Technological University, Thiruvananthapuram, Kerala)
Department of Computer Applications

## TIC TAC TOE


## 20MCA134
## Advanced Database Management System Lab
## Micro Project Report

## Submitted By

## NANDAKUMAR S
## ADHARSH C
## GOKUL PRASAD
## FARHANA A M
## ABHIRAMI C D







Under the guidance of

## Dr. Sujithra Sankar
## Assistant Professor
## &
## Dr. Geethu S.
## Assistant Professor



MCA 2024-26 BATCH                                                          20MCA134 ADBMS LAB MICRO PROJECT


Department of Computer Applications      2



## April – 2025
## Acknowledgement


We  would  like  to  express  our  sincere  gratitude  to  all  those  who  supported  and
guided  us  throughout  the  development  of  the Tic  Tac  Toe micro  project.  This
project  would  not  have  been  possible  without  their  invaluable  contributions  and
assistance.
We are deeply thankful to our mentor Dr. Sujithra Sankar, for the expertise,
guidance, and encouragement. We are grateful to our peers and friends who
provided valuable insights, engaged in meaningful discussions, and offered their
assistance whenever needed. Their diverse perspectives enriched the project's
outcome.
We  would  like  to  acknowledge  the  open-source  community  for  developing  and
maintaining  the  libraries,  frameworks,  and  tools  that  we  utilized  in  this  project.
Their contributions have greatly facilitated the implementation process.



## Place: Varikoli
## Date:









MCA 2024-26 BATCH                                                          20MCA134 ADBMS LAB MICRO PROJECT


Department of Computer Applications      3


Table of Contents


SI No Title Page No
## 1 Abstract 4
## 2 Introduction 5
## 3 Key Features 5
## 4 Benefits 6
## 5 Existing System Study 7
## 6 Modules 8
## 7
## Hardware & Software Requirements
## 10
## 8 Data Flow Diagrams 12
## 9 Table Designs 14
## 10 Screenshots 15
## 11 Conclusion 18


















MCA 2024-26 BATCH                                                          20MCA134 ADBMS LAB MICRO PROJECT


Department of Computer Applications      4
## 1. Abstract

This project is a desktop-based Tic Tac Toe game developed using Java
Swing, integrated with MongoDB for persistent storage of match results. It
offers an engaging two-player experience with features such as automatic
detection of wins and draws, and a user-friendly interface for viewing match
history. The application uses Maven for dependency and project management
and follows a structured design inspired by the Model-View-Controller (MVC)
pattern. Match outcomes, including the winner and timestamp, are stored in a
MongoDB collection, with data access managed through the DAO (Data
Access Object) pattern to ensure clean separation between logic and data
handling. This project effectively demonstrates the integration of Java GUI
development with modern NoSQL database technologies to create a modular,
efficient, and interactive desktop application.
















MCA 2024-26 BATCH                                                          20MCA134 ADBMS LAB MICRO PROJECT


Department of Computer Applications      5

## 2. Introduction

In the evolving landscape of software development, the integration of user-
friendly interfaces with reliable data storage solutions has become increasingly
essential. Desktop applications continue to hold relevance for lightweight,
offline-capable solutions, especially in educational and experimental projects.
This seminar presents a simple yet effective implementation of a Tic Tac Toe
game, developed using Java Swing for the graphical user interface and
MongoDB as a backend for persistent data storage.
The primary goal of this project is to combine the classic gameplay of Tic Tac
Toe with modern software development practices, including the use of the
DAO (Data Access Object) pattern for clean database interaction and Maven
for efficient project management. The application allows two players to play
the game, automatically detects wins or draws, and stores the results in a
MongoDB database. Additionally, users can view previous match outcomes
through a dedicated interface component.
This seminar aims to highlight the importance of combining graphical user
interface design with database integration in building practical, real-world
applications. It demonstrates how modular and maintainable code structures
can be implemented in Java desktop applications while emphasizing the value
of persistent data handling using NoSQL databases like MongoDB.

## 3. Key Features

 Interactive 2-Player Game Interface:
A simple and intuitive 3x3 grid developed using Java Swing, allowing two
players to take turns and play the classic Tic Tac Toe game.



MCA 2024-26 BATCH                                                          20MCA134 ADBMS LAB MICRO PROJECT


Department of Computer Applications      6

 Automatic Win and Draw Detection:
The game logic automatically identifies a win or a draw after each move,
providing real-time feedback to the players.
##  Persistent Match History:
Each game's result, including the winner and the timestamp, is stored in a
MongoDB collection, enabling long-term tracking of game outcomes.
##  Match History Viewer:
A “Show Match History” button allows users to retrieve and display
previous match results in a scrollable dialog using a JTextArea.
 DAO Pattern for Database Operations:
The application uses the Data Access Object (DAO) design pattern to
handle all database interactions, ensuring clean separation between the
application logic and data handling.
 MVC-Inspired Code Structure:
The codebase follows a modular structure inspired by the Model-View-
Controller (MVC) architecture, promoting maintainability and
scalability.
 Maven-Based Project Management:
Maven is used for efficient dependency management and project build,
streamlining the development process.

## 4. Benefits

##  Enhanced User Experience:
The interactive Java Swing GUI provides a simple and engaging
interface, making the classic Tic Tac Toe game enjoyable and accessible
for users of all ages.



MCA 2024-26 BATCH                                                          20MCA134 ADBMS LAB MICRO PROJECT


Department of Computer Applications      7

##  Persistent Data Storage:
Integration with MongoDB allows match results to be stored
permanently, enabling users to view their game history and track
performance over time.
 Modular and Maintainable Code:
The use of the DAO pattern and MVC-inspired architecture promotes
separation of concerns, making the code easier to maintain, debug, and
extend.
 Real-Time Game Feedback:
Automatic detection of wins and draws offers immediate and accurate
game outcome notifications, enhancing gameplay fluidity.
##  Educational Value:
This project serves as an excellent example for learning desktop
application development, database integration, and best coding practices
in Java.
##  Scalability:
The clean code structure and use of Maven facilitate future feature
additions, such as multiplayer over network or adding AI opponents.
 Cross-Platform Compatibility:
Being a Java application, it can run on any platform with a compatible
Java Runtime Environment, increasing accessibility.


## 5. Existing System Study

The  classic  Tic  Tac  Toe game  is  widely  available in  many  formats,  ranging
from simple paper-and-pencil versions to various digital implementations on
web  and  mobile  platforms.  Existing  digital  versions  typically  focus  on



MCA 2024-26 BATCH                                                          20MCA134 ADBMS LAB MICRO PROJECT


Department of Computer Applications      8
providing a graphical interface with options for single-player (against AI) or
two-player modes.
Many  traditional  implementations  use  basic  storage  methods  such  as  in-
memory  variables  or  flat  files  to  hold  game  state  temporarily,  which  means
that once the application closes, the match data is lost. Some online versions
may store game results on remote servers or databases, but these often require
complex   backend   infrastructure   and   are   designed   primarily   for   web
environments.
Current  desktop-based  Tic  Tac  Toe  games  often  lack  persistent  storage  of
match  history,  limiting  users'  ability  to  review  past  games  or  track  their
performance over time. Furthermore, few implementations follow a structured
software design pattern like MVC or DAO, resulting in tightly coupled code
that is harder to maintain or extend.
In  contrast,  this  project  integrates  MongoDB,  a  NoSQL  database,  to  store
match  outcomes  persistently,  allowing  users  to  access  their  match  history
anytime. The use of the DAO pattern abstracts database operations, enhancing
modularity  and  making  the  system  more  scalable.  Additionally,  leveraging
Java Swing offers a robust desktop GUI, while Maven simplifies dependency
and project management.
This  approach  fills  gaps  in  existing  solutions  by  combining  ease  of  use,
persistent data storage, and maintainable architecture in a lightweight desktop
application.

## 6. Modules


## ❖ Game Module:
This module handles the core gameplay logic and user interaction for the Tic
Tac Toe game.



MCA 2024-26 BATCH                                                          20MCA134 ADBMS LAB MICRO PROJECT


Department of Computer Applications      9
 Two-Player Interface: Provides an interactive 3x3 grid where two
players take turns to mark ‘X’ or ‘O’.
 Turn Management: Alternates between Player 1 and Player 2 for each
 move, ensuring fair gameplay.
 Win/Draw Detection: Automatically checks for winning conditions or a
draw after every move and declares the result immediately.
 Game Reset: Allows users to reset the board to start a new game without
restarting the application.

## ❖ Database Module:
This module manages the persistent storage and retrieval of game results
using MongoDB.
 Result Storage: Saves match details including winner name (or draw)
and the match timestamp into the MongoDB database after each game.
 Match History Retrieval: Fetches stored match results from MongoDB
for display on user request.
 Data Access Layer: Uses the DAO (Data Access Object) pattern to
abstract database operations, promoting clean and maintainable code.

## ❖ User Interface Module:
This module provides all the graphical components and handles user
interactions through Java Swing.
 Game Board: Displays the 3x3 grid buttons and updates them
dynamically based on player moves.
 Control Buttons: Includes options like "New Game", "Show Match
History", and "Exit".
 Result Display: Shows game outcomes (win/draw) prominently within
the interface.



MCA 2024-26 BATCH                                                          20MCA134 ADBMS LAB MICRO PROJECT


Department of Computer Applications      10
 Match History Dialog: Opens a scrollable text area dialog listing all
previous matches fetched from the database.

## ❖ Controller Module:
This module acts as the bridge between the user interface and the backend
logic.
 Event Handling: Captures user actions such as button clicks and
processes them accordingly.
 Game Logic Coordination: Directs game flow, updating the model
based on player input and refreshing the view.
 Database Interaction: Coordinates calls to the DAO layer for saving or
retrieving match data without exposing database details to the UI.

## ❖ Project Management Module:
This module manages the overall project dependencies and build process.
 Maven Integration: Handles project dependencies, compilation,
packaging, and ensures all required libraries (such as MongoDB Java
Driver) are included.
 Build Automation: Simplifies development with automated build and
testing workflows.

## 7. Hardware & Software Requirements

## Hardware Requirements:

## Client Machine:
 A personal computer or laptop capable of running Java applications
smoothly.



MCA 2024-26 BATCH                                                          20MCA134 ADBMS LAB MICRO PROJECT


Department of Computer Applications      11
 Minimum hardware specifications include:
o Processor: Dual-core or higher processor.
o RAM: 4 GB or more recommended for smooth performance.
o Storage: At least 500 MB of free disk space.

 Display: Monitor with minimum resolution of 1024x768 for proper
display of the GUI.
 Input Devices: Keyboard and mouse for game interaction.

## Server :
 If MongoDB is hosted on a separate server or remotely:
o Processor: Dual-core or higher.
o RAM: Minimum 2 GB for database operations.
o Storage: Sufficient disk space to store game match history data.

## Network Infrastructure:
o Stable network connection between client and database server for
uninterrupted data access.
o Adequate bandwidth to support game data communication.

## Software Requirements:

## Operating System:
 The client machine should run a stable OS capable of running Java
applications, such as:
o Windows 7 or later
o Linux distributions (e.g., Ubuntu, Fedora)
o macOS



MCA 2024-26 BATCH                                                          20MCA134 ADBMS LAB MICRO PROJECT


Department of Computer Applications      12
Java Runtime and Development:
 Java Development Kit (JDK): Version 8 or above installed to compile and
run the application.
 Java Swing: Included in JDK for GUI components.

Build and Dependency Management:
 Maven: Used for managing project dependencies and building the
application.
## Database Management System:
 MongoDB: Community Edition installed locally or accessible via a
remote server for storing game results.
 MongoDB Java Driver: Integrated via Maven for database connectivity.


IDE (Optional):
 Any Java IDE like IntelliJ IDEA, Eclipse, or NetBeans can be used for
development and debugging.


- Data Flow Diagram (DFD)

A Data Flow Diagram (DFD) is a visual representation that depicts the flow
of data within a system or process. It's a graphical tool used to model the
interactions and transformations of data as it moves through various
components of a system.

##  Zeroth Level Data Flow Diagram




MCA 2024-26 BATCH                                                          20MCA134 ADBMS LAB MICRO PROJECT


Department of Computer Applications      13
Provides an overview of the entire system or process at a high level, showing
the interactions between system and user. It's a simplified diagram that
presents a top-level perspective without going into the details of internal
processes.


##  Zeroth Level Data Flow Diagram




##  First Level Data Flow Diagram
A First-Level Data Flow Diagram (DFD) is a visual representation of the
most essential processes and data flows within a system or process. It
provides a high- level overview of how data moves between major
components of the system without delving into intricate details. First-Level
DFDs are often used as an initial step in the process of system analysis and
design.






MCA 2024-26 BATCH                                                          20MCA134 ADBMS LAB MICRO PROJECT


Department of Computer Applications      14

##  FIRST LEVEL DFD







## 9. Table Designs














MCA 2024-26 BATCH                                                          20MCA134 ADBMS LAB MICRO PROJECT


Department of Computer Applications      15

## 10. Screenshots















































































MCA 2024-26 BATCH                                                          20MCA134 ADBMS LAB MICRO PROJECT


Department of Computer Applications      16















































MCA 2024-26 BATCH                                                          20MCA134 ADBMS LAB MICRO PROJECT


Department of Computer Applications      17






















































MCA 2024-26 BATCH                                                          20MCA134 ADBMS LAB MICRO PROJECT


Department of Computer Applications      18

## 11. Conclusion
The Java Swing Tic Tac Toe project with MongoDB integration successfully
demonstrates the development of a simple yet fully functional desktop game
application with persistent data storage. By combining an interactive and
user-friendly GUI built using Java Swing with the power of MongoDB for
storing match histories, the project offers an engaging gameplay experience
along with the ability to review past results.
The implementation of automatic win/draw detection ensures smooth and
accurate game flow, while the modular architecture based on MVC
principles and DAO design pattern promotes clean, maintainable, and
scalable code. The integration of MongoDB not only adds durability to
match data but also highlights the importance of database management in
modern applications.
Overall, this project showcases practical skills in GUI development, event
handling, database connectivity, and software design patterns. It serves as a
strong foundation for more complex game development or database-
integrated desktop applications in the future.