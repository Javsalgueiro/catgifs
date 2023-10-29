import { loadState } from '@nextcloud/initial-state'
import { showSuccess, showError } from '@nextcloud/dialogs'
import OpenAI from 'openai';

const GPT_API_KEY = 'YOUR_API_KEY';

document.addEventListener('DOMContentLoaded', (event) => {
    main()
})

window.onload = function() {
    document.getElementById("loader").style.display = "none";
    document.addEventListener('DOMContentLoaded', (event) => {
        main();
    });
};

function main() {
    if (!document.getElementById("detailsForm") || !document.getElementById("loader") || !document.querySelector('#app-content #response')) {
        console.error("One or more required elements are missing from the DOM.");
        return;
    }
    const state = loadState('catgifs', 'tutorial_initial_state');
    configForm();
}

function configForm() {
    const form = document.getElementById('detailsForm');
    const loader = document.getElementById('loader');
    const responseDiv = document.querySelector('#app-content #response');
    const reportTypeSelector = document.getElementById('reportType');
    const clientRiskForm = document.getElementById('clientRiskForm');
    const imageGeneratorForm = document.getElementById('imageGeneratorForm');

    reportTypeSelector.addEventListener('change', function() {
        if (reportTypeSelector.value === 'clientRisk') {
            clientRiskForm.style.display = 'block';
            imageGeneratorForm.style.display = 'none';
        } else if (reportTypeSelector.value === 'imageGenerator') {
            clientRiskForm.style.display = 'none';
            imageGeneratorForm.style.display = 'block';
        }
    });

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        loader.style.display = 'block';

        const reportType = reportTypeSelector.value;

        if (reportType === 'clientRisk') {
            const fullName = document.getElementById('fullName').value;
            const contactDetails = document.getElementById('contactDetails').value;
            const businessNature = document.getElementById('businessNature').value;
            const relationshipDuration = document.getElementById('relationshipDuration').value;
            const financialOverview = document.getElementById('financialOverview').value;
            const incomeSources = document.getElementById('incomeSources').value;
            const significantTransactions = document.getElementById('significantTransactions').value;
            const businessOperations = document.getElementById('businessOperations').value;
            const keySuppliers = document.getElementById('keySuppliers').value;
            const operationalChallenges = document.getElementById('operationalChallenges').value;
            const registeredBodies = document.getElementById('registeredBodies').value;
            const pastViolations = document.getElementById('pastViolations').value;
            const publicRelations = document.getElementById('publicRelations').value;
            const controversies = document.getElementById('controversies').value;
            const primaryMarkets = document.getElementById('primaryMarkets').value;
            const foreignTransactions = document.getElementById('foreignTransactions').value;

            const prompt = buildPrompt(
                fullName,
                contactDetails,
                businessNature,
                relationshipDuration,
                financialOverview,
                incomeSources,
                significantTransactions,
                businessOperations,
                keySuppliers,
                operationalChallenges,
                registeredBodies,
                pastViolations,
                publicRelations,
                controversies,
                primaryMarkets,
                foreignTransactions
            );
            const answer = await askGpt(prompt);
            setResponseText(responseDiv, answer);
        } else if (reportType === 'imageGenerator') {
            // Handle the "Other Report" form submission here
            const imagePromptValue = document.getElementById('imagePromptInput').value;
            const imageGenerate = await generateImage(imagePromptValue);
            const generatedImage = document.getElementById("generatedImage");
            generatedImage.src = 'data:image/jpeg;base64,' + imageGenerate;

        }

        loader.style.display = 'none';
    });

    const clearFormBtn = document.getElementById("clearFormBtn");
    clearFormBtn.addEventListener("click", function() {
        form.reset();
        responseDiv.innerHTML = "";
        loader.style.display = "none";
    });
}

function setResponseText(div, text) {
    div.innerText = text;
}

function buildPrompt(fullName, contactDetails, businessNature, relationshipDuration, financialOverview, incomeSources, significantTransactions, businessOperations, keySuppliers, operationalChallenges, registeredBodies, pastViolations, publicRelations, controversies, primaryMarkets, foreignTransactions) {
    return `
Imagine you are a seasoned risk analyst with a strong background in financial and cybersecurity analysis, regulatory compliance, and market research. You have been tasked with generating a Client Risk Report for ${fullName}, a client who has provided detailed information about their business operations, financial status, and market exposure.

Based on the information provided, please structure the report as follows:

Executive Summary:
- Craft a brief overview based on the client's profile.
- Prepare a preliminary risk rating.

Client Profile:
- Full Name (or Company Name): ${fullName}
- Contact Details: ${contactDetails}
- Nature of Business or Profession: ${businessNature}
- Duration of Relationship with Our Company/Organization: ${relationshipDuration}

Financial Assessment:
- Analyze the financial information given.
- Determine the client's financial stability and creditworthiness.
- Look for patterns or inconsistencies in transactions.
- Brief Overview of Financial Position: ${financialOverview}
- Major Sources of Income and Wealth: ${incomeSources}
- Details of Recent Significant Financial Transactions (Last 12 Months): ${significantTransactions}

Risk Assessment:

a. Operational Risks:
- Analyze potential disruptions based on operational details.
- Assess the dependency on certain suppliers or customers.
- Brief About Primary Business Operations: ${businessOperations}
- Key Suppliers and Customers: ${keySuppliers}
- Any Operational Challenges Faced in the Recent Past: ${operationalChallenges}

b. Credit Risks:
- Review the client's credit history.
- Assess potential default risks based on financial details.

c. Regulatory and Compliance Risks:
- Assess potential risks based on provided compliance details.
- Research any unknown regulatory bodies mentioned.
- Any Regulatory Bodies You Are Registered With: ${registeredBodies}
- Details of Any Past Regulatory Violations or Non-Compliance (If Any): ${pastViolations}

d. Reputational Risks:
- Analyze public image using provided reputational information.
- Conduct a brief online search for any recent negative press or controversies.
- Public Relations Contacts or Press Releases (If Any): ${publicRelations}
- Any Known Controversies or Significant Public Relations Challenges: ${controversies}

e. Market Risks:
- Evaluate vulnerabilities based on market exposure details.
- Primary Markets You Operate In: ${primaryMarkets}
- Details of Any Significant Foreign Transactions or Operations: ${foreignTransactions}

Risk Mitigation Recommendations:
- Propose strategies based on identified risks.
- Suggest potential areas of collaboration.

Conclusion and Risk Rating:
- Finalize the client's risk level based on all assessments.
- Offer recommendations for future engagements or actions.

Appendices (if necessary):
- Attach any additional research or data used.

Please ensure that the report is accurate, responsible, and adheres to the highest ethical standards.
`;
}

async function askGpt(promptString) {
    const openai = new OpenAI({
        apiKey: GPT_API_KEY,
        dangerouslyAllowBrowser: true
    });

    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": promptString}],
    });

    console.log(chatCompletion);

    return chatCompletion.choices[0].message.content;
}

async function generateImage(promptString) {
    const openai = new OpenAI({
        apiKey: GPT_API_KEY,
        dangerouslyAllowBrowser: true
    })

    let response = await openai.images.generate({
        prompt: promptString,
        n: 1,
        size: "512x512",
        response_format: "b64_json"
      });

    return response.data[0].b64_json
}
