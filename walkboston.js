function renderBoston(boston, container) {
    const people = boston.data;
    const peopleLen = boston.data.length;
    console.log('People Length: ',peopleLen);
    let htmlTopFive = '';
    let htmlSalariesOver200k = '';
    let topFive = [];
    let moreOneHundred = 0;
    for (let i = 0; i < peopleLen; i++) {
      const personSalary = parseFloat(people[i][11]);
      let personName = people[i][8].split(',');
      personName = {'firstname' : personName[1], 'lastname' : personName[0]};

      if (personSalary > 100000) {
        moreOneHundred++;
      }

      if (topFive.length === 0) {
        const person = {'name' : personName, 'salary' : personSalary}; 
        topFive.push(person);
        continue;
      }
      
      for (let j = 0; j < topFive.length; j++) {
        const topSalary = topFive[j].salary;
        if (personSalary > topSalary || topFive.length === 0) {
          const person = {'name' : personName, 'salary' : personSalary}; 
          topFive.unshift(person);
          if (topFive.length > 5) {
            topFive.sort((a, b) => b.salary - a.salary);
            topFive.pop();
          }
          break;
        }
      }
    }
    console.log(topFive);
    console.log(moreOneHundred);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    for (let index = 0; index < topFive.length; index++) {
      const person = topFive[index];
      htmlTopFive += '<tr class="person">' +
      '<th scope="row">' + (index + 1) + '</th>' +
      '<td class="firstname">' + person.name.firstname + '</td>' +
      '<td class="lasttname">' + person.name.lastname + '</td>' +
      '<td class="salary">' + 'US$ ' + numberWithCommas(person.salary) + '</td>' +
      '</tr>';
    }

    const salariesOver200k = people.filter(person => person[11] > 200000);
    for (let index = 0; index < salariesOver200k.length; index++) {
      const personName = salariesOver200k[index][8];
      const personSalary = salariesOver200k[index][11];
      htmlSalariesOver200k += '<tr class="person">' +
      '<th scope="row">' + (index + 1) + '</th>' +
      '<td class="lasttname">' + personName + '</td>' +
      '<td class="salary">' + 'US$ ' + numberWithCommas(personSalary) + '</td>' +
      '</tr>';
    }
    
    container.innerHTML = `
      <div class="container pt-3">
        <h2 class="section-title py-3">Top Five Salaries in Boston</h2>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Salary</th>
            </tr>
          </thead>
          <tbody id="table-body">
            ${htmlTopFive}
          </tbody>
        </table>
      </div>
      <div class="container pt-3">
        <h2 class="section-title py-3">High Salaries in Boston City</h2>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Salaries</th>
              <th scope="col">People</th>
            </tr>
          </thead>
          <tbody id="table-body">
            <tr>
              <td scope="col">All Salaries</th>
              <td scope="col">${numberWithCommas(peopleLen)}</th>
            </tr>
            <tr>
              <td scope="col">Salaries over $100,000</th>
              <td scope="col">${numberWithCommas(moreOneHundred)}</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="topSalaries" class="container pt-3">
        <h2 class="section-title py-3">Employees Who Make More than $200,000</h2>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Salary</th>
            </tr>
          </thead>
          <tbody id="table-body">
            ${htmlSalariesOver200k}
          </tbody>
        </table>
      </div>
    `;
}
renderBoston(boston, document.getElementById('container'));