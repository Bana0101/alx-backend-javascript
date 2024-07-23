const fs = require('fs');

const countStudents = (dataPath) => new Promise((resolve, reject) => {
    fs.readFile(dataPath, 'utf-8', (err, data) => {
        if (err) {
            return reject(new Error('Cannot load the database'));
        }

        if (data) {
            // Split data into lines
            const fileLines = data
                .trim()
                .split('\n');
            
            // Check if fileLines has content
            if (fileLines.length < 2) {
                return reject(new Error('No data found in the file'));
            }

            const studentGroups = {};
            const dbFieldNames = fileLines[0].split(',');
            const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

            for (const line of fileLines.slice(1)) {
                const studentRecord = line.split(',');
                if (studentRecord.length < dbFieldNames.length) {
                    continue; // Skip invalid records
                }

                const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
                const field = studentRecord[studentRecord.length - 1];

                if (!Object.keys(studentGroups).includes(field)) {
                    studentGroups[field] = [];
                }

                // Manually create student object
                const student = {};
                studentPropNames.forEach((propName, idx) => {
                    student[propName] = studentPropValues[idx];
                });

                studentGroups[field].push(student);
            }

            // Calculate total number of students
            const totalStudents = Object.values(studentGroups)
                .reduce((total, group) => total + group.length, 0);

            // Print total number of students
            console.log(`Number of students: ${totalStudents}`);

            // Print number of students and list for each field
            for (const [field, group] of Object.entries(studentGroups)) {
                const studentNames = group.map(student => student.firstname).join(', ');
                console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
            }

            resolve(true);
        }
    });
});

module.exports = countStudents;

