describe('Função de atualização de EPI', () => {

  it('Deve retornar a mensagem EPI atualizado', () => {
    const epiId = '1020608955677343745'

    cy.visit(`http://localhost:5173/atualizar_epi/${epiId}`)

    cy.intercept('PUT', `http://localhost:3000/atualizar_epi/${epiId}`).as('atualizarEpi')

    cy.get('input[name="nome"]').clear().type('Capacete')
    cy.get('input[name="quantidade"]').clear().type('100')

    cy.get('button[type="submit"]').click()

    cy.wait('@atualizarEpi')

    cy.get('p').contains('EPI atualizado').should('be.visible')
  })

})

describe('Função de atualização de Funcionario', () => {

  it('Deve retornar a mensagem Cadastro de funcionário atualizado', () => {
    const funcionarioId = '1026006632854781953'

    cy.visit(`http://localhost:5173/atualizar_funcionario/${funcionarioId}`)

    cy.intercept('PUT', `http://localhost:3000/atualizar_funcionario/${funcionarioId}`).as('atualizarFuncionario')

    cy.get('input[name="nome"]').clear().type('Teste TI')
    cy.get('input[name="email"]').clear().type('teste@gmail.com')
    cy.get('input[name="fone"]').clear().type('48991088170')
    cy.get('input[name="setor"]').clear().type('Teste TI')

    cy.get('button[type="submit"]').click()

    cy.wait('@atualizarFuncionario')

    cy.get('p').contains('Cadastro de funcionário atualizado').should('be.visible')
  })

})

describe('Função de cadastro de funcionário', () => {

  it('Deve retornar a mensagem Funcionário cadastrado com sucesso! ', () => {

    cy.visit(`http://localhost:5173/funcionario/cadastro`)

    cy.intercept('POST', `http://localhost:5173/funcionario/cadastro`).as('cadastrarFuncionario')

    cy.get('input[name="nome"]').clear().type('Teste TI')
    cy.get('input[name="email"]').clear().type('teste@gmail.com')
    cy.get('input[name="fone"]').clear().type('48991088170')
    cy.get('input[name="setor"]').clear().type('Teste TI')
    cy.get('input[name="senha"]').clear().type('1234')

    cy.get('button[name="cadastrar"]').click()

    cy.get('p').contains('Funcionário cadastrado com sucesso!').should('be.visible')
  })

})

describe('Função de cadastro de EPI', () => {

  it('Deve retornar a mensagem EPI cadastrado com sucesso! ', () => {

    cy.visit(`http://localhost:5173/epi/cadastro`)

    cy.intercept('POST', `http://localhost:5173/epi/cadastro`).as('cadastrarEpi')

    cy.get('input[type="text"]').clear().type('Teste TI')
    cy.get('input[type="number"]').clear().type('0')

    cy.get('button[type="submit"]').click()

    cy.get('p').contains('EPI cadastrado com sucesso!').should('be.visible')
  })

})

describe('Função para listar historico', () => {

  it('Deve retornar a mensagem EPI cadastrado com sucesso! ', () => {

    cy.visit(`http://localhost:5173/funcionario/1018089401865502721`)

    cy.intercept('GET', `http://localhost:5173/funcionario/1018089401865502721`).as('mostrarRelatorioEPI')

    cy.get('h3').contains('Relatório de Movimentação de EPIs').should('be.visible')
  })

})


describe('Função para listar historico por funcionario', () => {

  it('Deve retornar a mensagem EPI cadastrado com sucesso! ', () => {

    cy.visit(`http://localhost:5173/funcionario/1018089401865502721`)

    cy.intercept('GET', `http://localhost:5173/funcionario/1018089401865502721`).as('mostrarRelatorioEPI')

    cy.get('h3').contains('Relatório de Movimentação de EPIs').should('be.visible')
  })

})

describe('Função para registrar retirada de epi', () => {

  it('Deve retornar a mensagem  ', () => {

    cy.visit(`http://localhost:5173/registro`)

    cy.intercept('POST', `http://localhost:5173/registro`).as('Relatorio')

    cy.get('input[name="nomeFuncionario"]').clear().type('Teste TI')
    cy.get('input[name="nomeEPI"]').clear().type('Capacete')
    cy.get('input[name="quantidade"]').clear().type('1')
    cy.get('input[name="data"]').clear().type('0')
    cy.get('input[name="statuss"]').clear().type('Retirada')

    cy.get('button[className="registro_form_button"]').click()

    cy.get('p').contains('Quantidade atualizada com sucesso!').should('be.visible')
  })

})