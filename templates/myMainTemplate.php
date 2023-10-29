<?php
use OCP\Util;
$appId = OCA\CatGifs\AppInfo\Application::APP_ID;
Util::addScript($appId, $appId . '-mainScript');
Util::addStyle($appId, 'main');
?>

<div id="app-content">
    <h2>Report Generator</h2>

    <div class="container">
        <form id="detailsForm">

            <label for="reportType">Select an option:</label><br>
            <select id="reportType" name="reportType">
                <option value="clientRisk">Client Risk Report</option>
                <option value="imageGenerator">Image Generator</option>
            </select><br><br>

            <div id="clientRiskForm">
                <h3>Client Profile</h3>
                <label for="fullName">Full Name (or Company Name):</label><br>
                <input type="text" id="fullName" name="fullName"><br><br>

                <label for="contactDetails">Contact Details:</label><br>
                <textarea id="contactDetails" name="contactDetails"></textarea><br><br>

                <label for="businessNature">Nature of Business or Profession:</label><br>
                <textarea id="businessNature" name="businessNature"></textarea><br><br>

                <label for="relationshipDuration">Duration of Relationship with Our Company/Organization:</label><br>
                <input type="text" id="relationshipDuration" name="relationshipDuration"><br><br>

                <h3>Financial Information</h3>
                <label for="financialOverview">Brief Overview of Financial Position:</label><br>
                <textarea id="financialOverview" name="financialOverview"></textarea><br><br>

                <label for="incomeSources">Major Sources of Income and Wealth:</label><br>
                <textarea id="incomeSources" name="incomeSources"></textarea><br><br>

                <label for="significantTransactions">Details of Recent Significant Financial Transactions (Last 12 Months):</label><br>
                <textarea id="significantTransactions" name="significantTransactions"></textarea><br><br>

                <h3>Operational Details</h3>
                <label for="businessOperations">Brief About Primary Business Operations:</label><br>
                <textarea id="businessOperations" name="businessOperations"></textarea><br><br>

                <label for="keySuppliers">Key Suppliers and Customers:</label><br>
                <textarea id="keySuppliers" name="keySuppliers"></textarea><br><br>

                <label for="operationalChallenges">Any Operational Challenges Faced in the Recent Past:</label><br>
                <textarea id="operationalChallenges" name="operationalChallenges"></textarea><br><br>

                <h3>Regulatory and Compliance</h3>
                <label for="registeredBodies">Any Regulatory Bodies You Are Registered With:</label><br>
                <textarea id="registeredBodies" name="registeredBodies"></textarea><br><br>

                <label for="pastViolations">Details of Any Past Regulatory Violations or Non-Compliance (If Any):</label><br>
                <textarea id="pastViolations" name="pastViolations"></textarea><br><br>

                <h3>Reputational Information</h3>
                <label for="publicRelations">Public Relations Contacts or Press Releases (If Any):</label><br>
                <textarea id="publicRelations" name="publicRelations"></textarea><br><br>

                <label for="controversies">Any Known Controversies or Significant Public Relations Challenges:</label><br>
                <textarea id="controversies" name="controversies"></textarea><br><br>

                <h3>Market Exposure</h3>
                <label for="primaryMarkets">Primary Markets You Operate In:</label><br>
                <textarea id="primaryMarkets" name="primaryMarkets"></textarea><br><br>

                <label for="foreignTransactions">Details of Any Significant Foreign Transactions or Operations:</label><br>
                <textarea id="foreignTransactions" name="foreignTransactions"></textarea><br><br>
            </div>

            <div id="imageGeneratorForm" style="display: none;">
                <h3>Image Generator Form</h3>
                <!-- Input fields for Image Generator -->
                <label for="imagePrompt">Enter a prompt for the image you want to generate:</label><br>
                <input type="text" id="imagePromptInput" name="imagePromptInput"><br><br>

                <div id="image">
                    <img id="generatedImage" alt="Image would be here" style="max-width: 100%; height: auto;">
                </div>
            </div>

            <input type="submit" value="Submit">
            <button type="button" id="clearFormBtn">Clear Form</button>
        </form>

        <div id="rightDiv">
            <div id="response"></div>
            <div id="loader" class="loader"></div>
        </div>
    </div>
</div>
