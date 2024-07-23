const fs = require('fs').promises;

const countStudents = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf-8');
    const lines = data.trim().split('\n');

    const c = lines.length - 1;
    console.log(`Number of students: ${c}`);

    const CS = [];
    const SWE = [];

    for (let i = 1; i <= c; i += 1) {
      const line = lines[i].split(',');
      const sName = line[0].trim();
      const sClass = line[3].trim();

      if (sClass === 'CS') {
        CS.push(sName);
      } else if (sClass === 'SWE') {
        SWE.push(sName);
      }
    }

    console.log(`Number of students in CS: ${CS.length}. List: ${CS.join(', ')}`);
    console.log(`Number of students in SWE: ${SWE.length}. List: ${SWE.join(', ')}`);
  } catch (err) {
    throw new Error('Cannot load the database');
  }
};

module.exports = countStudents;
