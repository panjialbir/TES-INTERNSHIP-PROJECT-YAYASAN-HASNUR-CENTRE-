let courses = [];
let selectedCourseId = null;
let materials = [];
let selectedMaterialId = null;

function saveCourse() {
    const title = document.getElementById('course-title').value;
    const description = document.getElementById('course-description').value;
    const duration = document.getElementById('course-duration').value;
    const courseId = document.getElementById('course-id').value;

    if (title && description && duration) {
        if (courseId) {
            // Update existing course
            const course = courses.find(course => course.id === parseInt(courseId));
            course.title = title;
            course.description = description;
            course.duration = duration;
        } else {
            // Create new course
            const course = { id: Date.now(), title, description, duration, materials: [] };
            courses.push(course);
        }
        renderCourses();
        clearCourseForm();
    }
}

function renderCourses() {
    const courseList = document.getElementById('courses');
    courseList.innerHTML = '';

    courses.forEach((course) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${course.title} - ${course.description} (${course.duration})</span>
            <button onclick="editCourse(${course.id})">Edit</button>
            <button onclick="deleteCourse(${course.id})">Delete</button>
            <button onclick="viewMaterials(${course.id})">View Materials</button>
        `;
        courseList.appendChild(li);
    });
}

function editCourse(id) {
    const course = courses.find(course => course.id === id);
    if (course) {
        document.getElementById('course-id').value = course.id;
        document.getElementById('course-title').value = course.title;
        document.getElementById('course-description').value = course.description;
        document.getElementById('course-duration').value = course.duration;
    }
}

function deleteCourse(id) {
    courses = courses.filter(course => course.id !== id);
    renderCourses();
}

function viewMaterials(courseId) {
    const course = courses.find(course => course.id === courseId);
    if (course) {
        selectedCourseId = courseId;
        materials = course.materials;
        renderMaterials();
    }
}

function saveMaterial() {
    const title = document.getElementById('material-title').value;
    const description = document.getElementById('material-description').value;
    const link = document.getElementById('material-link').value;
    const materialId = document.getElementById('material-id').value;

    if (title && description && link) {
        if (materialId) {
            // Update existing material
            const material = materials.find(material => material.id === parseInt(materialId));
            material.title = title;
            material.description = description;
            material.link = link;
        } else {
            // Add new material to course
            const material = { id: Date.now(), title, description, link };
            materials.push(material);
        }
        renderMaterials();
        clearMaterialForm();
    }
}

function renderMaterials() {
    const materialList = document.getElementById('materials');
    materialList.innerHTML = '';

    materials.forEach((material) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${material.title} - ${material.description} (${material.link})</span>
            <button onclick="editMaterial(${material.id})">Edit</button>
            <button onclick="deleteMaterial(${material.id})">Delete</button>
        `;
        materialList.appendChild(li);
    });

    // Update the selected course with new materials
    const course = courses.find(course => course.id === selectedCourseId);
    if (course) {
        course.materials = materials;
    }
}

function editMaterial(id) {
    const material = materials.find(material => material.id === id);
    if (material) {
        document.getElementById('material-id').value = material.id;
        document.getElementById('material-title').value = material.title;
        document.getElementById('material-description').value = material.description;
        document.getElementById('material-link').value = material.link;
    }
}

function deleteMaterial(id) {
    materials = materials.filter(material => material.id !== id);
    renderMaterials();
}

function clearCourseForm() {
    document.getElementById('course-id').value = '';
    document.getElementById('course-title').value = '';
    document.getElementById('course-description').value = '';
    document.getElementById('course-duration').value = '';
}

function clearMaterialForm() {
    document.getElementById('material-id').value = '';
    document.getElementById('material-title').value = '';
    document.getElementById('material-description').value = '';
    document.getElementById('material-link').value = '';
}
