
const fs = require('fs');
const path = require('path');

function countStudents(filePath) {
	try {
		// Read the CSV file
		const data = fs.readFileSync(filePath, 'utf8');

		// split data into lines
		const lines = data.trim().split('\n');

		// Extract headers and students
		const [header, ...students] = lines;
		const studentList = students.map(line => line.split(','));
		const fields = {};

		// Count students and categorize them by field
		studentList.forEach(student => {
			const [firstname, , , field] = student;
			if (field) {
				if (!fields[field]) {
					fields[field] = [];
				}
				fields[field].push(firstname);
			}
		});

		console.log(`Number of students: ${studentList.length}`);
		for (const [field, names] of Object.entries(fields)) {
			console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
		}
	} catch (err) {
		throw new Error('cannot load the database');
	}
}

module.exports = countStudents;
