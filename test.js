(async () => {
    // Criar taks
    await fetch('http://localhost:3333/tasks', {
        method: 'POST',
        body: JSON.stringify({
            title: "Test Task",
            description: "description of the test task"
        }),
        duplex: 'half'
    }).then((res) => {
        if (res.status === 201) {
            console.info("Criar task - success!")
        } else{
            console.warn("Criar task - failed!");
        }
    });

    // listar tasks
    await fetch('http://localhost:3333/tasks', {
        method: 'GET',
        duplex: 'half'
    }).then((res) => {
        if (res.status === 200) {
            console.info("Listar task - success!")
        } else {
            console.warn("Listar task - failed!");
        }
    });

    // Atualizar task
    await fetch('http://localhost:3333/tasks/012345678-abcd-9012-efgh-3456789ijklm', {
        method: 'PUT',
        body: JSON.stringify({
            title: "SUPER Debug Task EDITED OFC",
            description: "description of the test task"
        }),
        duplex: 'half'
    }).then((res) => {
        if (res.status === 204) {
            console.info("Atualizar task - success!")
        } else {
            console.warn("Atualizar task - failed!");
        }
    });

    // Marcar task completa
    await fetch('http://localhost:3333/tasks/012345678-abcd-9012-efgh-3456789ijklm/complete', {
        method: 'PATCH',
        duplex: 'half'
    }).then((res) => {
        if (res.status === 204) {
            console.info("Marcar task completa - success!")
        } else {
            console.warn("Marcar task completa - failed!");
        }
    });

    // Deletar task
    await fetch('http://localhost:3333/tasks/012345678-abcd-9012-efgh-3456789ijklm', {
        method: 'DELETE',
        duplex: 'half'
    }).then((res) => {
        if (res.status === 204) {
            console.info("Deletar task - success!")
        } else {
            console.warn("Deletar task - failed!");
        }
    });

})();