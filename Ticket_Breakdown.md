# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Ticket 1: Design and Implement Custom ID Field in Facilities and Agents Table

**Description:**  
In order to allow facilities to save their own custom IDs for each agent they work with, we need to update the database schema of the Facilities and Agents tables to include a new field: `custom_id`. 

**Acceptance Criteria:**  
1. The Facilities and Agents tables should have a new field called `custom_id` which can store alphanumeric values.
2. The `custom_id` can be optional for each Facility-Agent relation.
3. The `custom_id` field should be unique for each Facility-Agent relation.

**Time/Effort Estimate:**  
Assuming minor database updates and no major refactoring is needed, this task should take around 2 days to implement and test.

**Implementation Details:**  
Add a new column `custom_id` to the Facilities and Agents relational table. This will require modifying the database schema, updating the SQL statements used for inserting and fetching data from the table, and testing the changes thoroughly.


## Ticket 2: Update `getShiftsByFacility` Function to Retrieve Custom IDs

**Description:**  
Update the `getShiftsByFacility` function to include the `custom_id` of the Agent in the returned data. 

**Acceptance Criteria:**  
1. The function `getShiftsByFacility` should return the `custom_id` along with the other data for each Agent.

**Time/Effort Estimate:**  
Assuming minor code changes, this task should take around 1 day to implement and test.

**Implementation Details:**  
Modify the SQL query in the `getShiftsByFacility` function to include the `custom_id` field. Ensure that the function returns this field along with the rest of the Agent's data.


## Ticket 3: Update `generateReport` Function to Use Custom IDs

**Description:**  
Update the `generateReport` function to use the `custom_id` instead of the internal database ID when generating reports.

**Acceptance Criteria:**  
1. The `generateReport` function should use the `custom_id` in the report if it is available. If not, it should fall back to using the internal database ID.
2. The generated PDF reports should show the `custom_id` (if available) for each Agent instead of their internal database ID.

**Time/Effort Estimate:**  
This task should take around 2 days to implement and test.

**Implementation Details:**  
Modify the `generateReport` function to use the `custom_id` field instead of the internal database ID. Ensure that the function correctly falls back to the internal database ID if the `custom_id` is not available.


## Ticket 4: Perform End-to-End Testing

**Description:**  
Perform comprehensive end-to-end testing to ensure that the whole process of assigning custom IDs and generating reports with these IDs works correctly.

**Acceptance Criteria:**  
1. Assigning custom IDs to Agents should work correctly.
2. The `getShiftsByFacility` function should correctly return the custom IDs.
3. The `generateReport` function should correctly use the custom IDs in the reports.
4. The system should correctly fall back to using internal database IDs if custom IDs are not available.

**Time/Effort Estimate:**  
This task should take around 2 days to complete.

**Implementation Details:**  
Create a test plan covering all the scenarios related to the custom ID feature, and perform the tests. Ensure that all tests pass successfully.
