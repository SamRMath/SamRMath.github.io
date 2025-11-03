
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('mainContent');
    const originalForm = document.getElementById('introForm');

    let attachFormBehaviors;

    function generateJSON(form) {
        const formData = new FormData(form);
        const data = {
            firstName: formData.get('firstName'),
            preferredName: formData.get('nickname'),
            middleInitial: formData.get('middleName'),
            lastName: formData.get('lastName'),
            divider: formData.get('divider'),
            mascotAdjective: formData.get('mascotAdj'),
            mascotAnimal: formData.get('mascotAnimal'),
            image: formData.get('picture') ? formData.get('picture').name : '',
            imageCaption: formData.get('picCaption'),
            personalStatement: formData.get('personalStatement'),
            backgroundInfo: formData.get('bullet1'),
            hobbies: formData.get('bullet2'),
            skills: formData.get('bullet3'),
            goals: formData.get('bullet4'),
            favoriteSubjects: formData.get('bullet5'),
            experience: formData.get('bullet6'),
            funFact: formData.get('bullet7')
        };

        // Courses
        const coursesDiv = form.querySelectorAll('#courses .course');
        data.courses = Array.from(coursesDiv).map((course) => ({
            department: course.querySelector('[name="dept"]').value,
            number: course.querySelector('[name="courseNum"]').value,
            name: course.querySelector('[name="courseName"]').value,
            reason: course.querySelector('[name="reason"]').value
        }));

        // Links
        data.links = [];
        for (let i = 1; i <= 5; i++) {
            const href = formData.get('link' + i);
            if (href) {
                let name = '';
                switch (i) {
                    case 1: name = 'LinkedIn'; break;
                    case 2: name = 'GitHub'; break;
                    case 3: name = 'Twitter'; break;
                    case 4: name = 'Facebook'; break;
                    case 5: name = 'Instagram'; break;
                }
                data.links.push({ name, href });
            }
        }

        const jsonText = JSON.stringify(data, null, 2);

        // Replace form with JSON view
        mainContent.innerHTML = `
            <h2>Introduction JSON</h2>
            <section>
                <pre><code class="json">${jsonText}</code></pre>
            </section>
        `;
        hljs.highlightAll();

        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset Form';
        resetButton.style.marginTop = '1rem';
        resetButton.addEventListener('click', () => {
            location.reload(); // simplest: reload page to restore form
        });
        mainContent.appendChild(resetButton);
    }

    function attachDeleteCourseHandlers(coursesDiv) {
        coursesDiv.querySelectorAll('.deleteCourse').forEach((btn) => {
            btn.onclick = () => btn.parentElement.remove();
        });
    }

    attachFormBehaviors = (form) => {
        const generateBtn = form.querySelector('#generate-json');
        const clearBtn = form.querySelector('#clear');
        const resetBtn = form.querySelector('[type="reset"]');
        const addCourseBtn = form.querySelector('#addCourse');

        // Generate JSON
        generateBtn.addEventListener('click', () => generateJSON(form));

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

        // Reset button should also reattach behaviors
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
    };


    attachFormBehaviors(originalForm);
});