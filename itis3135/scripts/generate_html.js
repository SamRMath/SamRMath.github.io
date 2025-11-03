document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('mainContent');
    const originalForm = document.getElementById('introForm');

    function attachDeleteCourseHandlers(coursesDiv) {
        coursesDiv.querySelectorAll('.deleteCourse').forEach((btn) => {
            btn.onclick = () => btn.parentElement.remove();
        });
    }

    let generateHTML;

    function attachFormBehaviors(form) {
        const generateJSONBtn = form.querySelector('#generate-json');
        const generateHTMLBtn = form.querySelector('#generate-html');
        const clearBtn = form.querySelector('#clear');
        const resetBtn = form.querySelector('[type="reset"]');
        const addCourseBtn = form.querySelector('#addCourse');

        // Generate HTML
        generateHTMLBtn.addEventListener('click', () => generateHTML(form));

        // Clear all fields
        clearBtn.addEventListener('click', () => {
            form.reset();
            form.querySelectorAll('input[type="text"], input[type="url"], textarea').forEach((input) => input.value = '');
            form.querySelectorAll('input[type="checkbox"]').forEach((cb) => cb.checked = false);

            // reset courses
            const coursesDiv = form.querySelector('#courses');
            coursesDiv.innerHTML = `<div class="course">
                <input type="text" name="dept" placeholder="Department" required>
                <input type="text" name="courseNum" placeholder="Number" required>
                <input type="text" name="courseName" placeholder="Name" required>
                <input type="text" name="reason" placeholder="Reason" required>
                <button type="button" class="deleteCourse">Delete</button>
            </div>`;
            attachDeleteCourseHandlers(coursesDiv);
        });

        // Reset button should reattach behaviors
        resetBtn.addEventListener('click', () => {
            setTimeout(() => attachFormBehaviors(form), 0);
        });

        // Add course
        addCourseBtn.addEventListener('click', () => {
            const coursesDiv = form.querySelector('#courses');
            const newCourse = document.createElement('div');
            newCourse.className = 'course';
            newCourse.innerHTML = `
                <input type="text" name="dept" placeholder="Department" required>
                <input type="text" name="courseNum" placeholder="Number" required>
                <input type="text" name="courseName" placeholder="Name" required>
                <input type="text" name="reason" placeholder="Reason" required>
                <button type="button" class="deleteCourse">Delete</button>
            `;
            coursesDiv.appendChild(newCourse);
            attachDeleteCourseHandlers(coursesDiv);
        });

        attachDeleteCourseHandlers(form.querySelector('#courses'));
    }

    generateHTML = (form) => {
        const mainContent = document.getElementById('mainContent');
        const formData = new FormData(form);

        const firstName = formData.get('firstName') || '';
        const middleName = formData.get('middleName') ? formData.get('middleName') + '. ' : '';
        const nickname = formData.get('nickname') || '';
        const lastName = formData.get('lastName') || '';
        const mascotAdj = formData.get('mascotAdj') || '';
        const mascotAnimal = formData.get('mascotAnimal') || '';
        const divider = formData.get('divider') || '★';
        const picCaption = formData.get('picCaption') || '';
        const personalStatement = formData.get('personalStatement') || '';
        const quote = formData.get('quote') || '';
        const quoteAuthor = formData.get('quoteAuthor') || '';
        const funny = formData.get('funny') || '';
        const share = formData.get('share') || '';
        const ackDate = formData.get('ackDate') || '';

        // --- Build HTML content as string ---
        let htmlString = `<h2>Introduction HTML</h2>\n`;
        htmlString += `<h3>${firstName} ${middleName}"${nickname}" ${lastName} ${divider} ${mascotAdj} ${mascotAnimal}</h3>\n`;

        // Image
        const fileInput = form.querySelector('#picture');
        const file = fileInput.files[0];
        let imgSrc = 'images/headshot.jpeg'; // fallback
        if (file) {
            imgSrc = URL.createObjectURL(file);
        }
        htmlString += `<figure>\n<img src="${imgSrc}" alt="Headshot of ${firstName} ${lastName}">\n<figcaption>${picCaption}</figcaption>\n</figure>\n`;

        // Personal Statement
        htmlString += `<p><strong>Personal Statement:</strong> ${personalStatement}</p>\n`;

        // Bullets
        htmlString += `<ul>\n`;
        for (let i = 1; i <= 7; i++) {
            const val = formData.get('bullet' + i);
            if (val) htmlString += `  <li>${val}</li>\n`;
        }
        htmlString += `</ul>\n`;

        // Courses
        const courseDivs = form.querySelectorAll('#courses .course');
        if (courseDivs.length) {
            htmlString += `<h4>Courses</h4>\n<ul>\n`;
            courseDivs.forEach((course) => {
                const dept = course.querySelector('[name="dept"]').value;
                const num = course.querySelector('[name="courseNum"]').value;
                const name = course.querySelector('[name="courseName"]').value;
                const reason = course.querySelector('[name="reason"]').value;
                htmlString += `  <li><strong>${dept} ${num}:</strong> ${name} — ${reason}</li>\n`;
            });
            htmlString += `</ul>\n`;
        }

        // Funny Thing
        if (funny.trim() !== '') {
            htmlString += `<p><strong>Funny Thing:</strong> ${funny}</p>\n`;
        }

        // Something to Share
        if (share.trim() !== '') {
            htmlString += `<p><strong>Something I’d like to share:</strong> ${share}</p>\n`;
        }

        // Quote
        if (quote && quoteAuthor) {
            htmlString += `<blockquote>"${quote}" — ${quoteAuthor}</blockquote>\n`;
        }

        // Links
        htmlString += `<h4>Links</h4>\n<ul>\n`;
        for (let i = 1; i <= 5; i++) {
            const link = formData.get('link' + i);
            if (link) htmlString += `  <li><a href="${link}" target="_blank">${link}</a></li>\n`;
        }
        htmlString += `</ul>\n`;

        // Acknowledgment
        htmlString += `<p>Acknowledged on: ${ackDate}</p>\n`;

        // --- Display rendered HTML ---
        mainContent.innerHTML = htmlString;

        // --- Display HTML code for copy/paste ---
        const codeBlock = document.createElement('pre');
        const code = document.createElement('code');
        code.className = 'html'; // Highlight.js will detect as HTML
        code.textContent = htmlString; // Preserve the HTML as text
        codeBlock.appendChild(code);
        mainContent.appendChild(codeBlock);

        // Highlight.js syntax highlighting
        if (window.hljs) {
            hljs.highlightAll();
        }

        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset Form';
        resetButton.style.marginTop = '1rem';
        resetButton.addEventListener('click', () => {
            location.reload(); // simplest: reload page to restore form
        });
        mainContent.appendChild(resetButton);
    };

    attachFormBehaviors(originalForm);
});