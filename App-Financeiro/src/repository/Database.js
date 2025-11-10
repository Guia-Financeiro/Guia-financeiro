import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('financeiro.db');

// ========== CRIAR TABELAS ==========
const createTables = () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS lancamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT NOT NULL,
        nome TEXT NOT NULL,
        valor REAL NOT NULL,
        data TEXT NOT NULL,
        repete INTEGER DEFAULT 0,
        repete_sempre INTEGER DEFAULT 0,
        repete_meses INTEGER DEFAULT 0
      );
    `);
    console.log('✅ Tabela lancamentos criada ou já existe.');

    migrarTabela();
  } catch (error) {
    console.error('❌ Erro ao criar tabela lancamentos:', error);
  }
};

// ========== MIGRAR TABELA ==========
const migrarTabela = () => {
  try{
    db.execSync(`Alter table lancamentos add column repete INTEGER DEFAULT 0;`);
    console.log('✅ Migração da coluna repete concluída.');
    db.execSync(`Alter table lancamentos add column repete_sempre INTEGER DEFAULT 0;`);
    console.log('✅ Migração da coluna repete_sempre concluída.');
    db.execSync(`Alter table lancamentos add column repete_meses INTEGER DEFAULT 0;`);
    console.log('✅ Migração da coluna repete_meses concluída.');
  } catch (error) {
    console.error('❌ Erro ao migrar tabela lancamentos:', error);
  }
};

// ========== BUSCAR LANÇAMENTOS ==========
const getLancamentos = async () => {
  try {
    const lancamentos = await db.getAllAsync('SELECT * FROM lancamentos ORDER BY data DESC;');
    console.log('✅ Lancamentos recuperados com sucesso.');
    return lancamentos;
  } catch (error) {
    console.error('❌ Erro ao recuperar lancamentos:', error);
    return [];
  }
};


// ========== ADICIONAR LANÇAMENTO ==========
const addLancamento = async (lancamento) => {
  try {
    const{ tipo, nome, valor, data, repete = 0, repete_sempre = 0, repete_meses = 0 } = lancamento;

    if (!tipo || !nome || valor === undefined || !data) {
      console.error('❌ Dados inválidos para adicionar lançamento:', lancamento);
      return false;
    }

    await db.runAsync(
      'INSERT INTO lancamentos (tipo, nome, valor, data, repete, repete_sempre, repete_meses) VALUES (?, ?, ?, ?, ?, ?, ?);',
      [tipo, nome, valor, data, repete, repete_sempre, repete_meses]
    );
    console.log('✅ Lançamento adicionado com sucesso.');
    return true;
  } catch (error) {
    console.error('❌ Erro ao adicionar lançamento:', error);
    return false;
  }
};

// ========== DELETAR LANÇAMENTO ==========
const deleteLancamento = async (id) => {
  try {
    await db.runAsync('DELETE FROM lancamentos WHERE id = ?;', [id]);
    console.log('✅ Lançamento deletado com sucesso.');
    return true;
  } catch (error) {
    console.error('❌ Erro ao deletar lançamento:', error);
    return false;
  }
};

// ========== ATUALIZAR LANÇAMENTO ==========
const updateLancamento = async (id, lancamento) => {
  try {
    const { tipo, nome, valor, data, repete = 0, repete_sempre = 0, repete_meses = 0 } = lancamento;
    await db.runAsync(
      'UPDATE lancamentos SET tipo = ?, nome = ?, valor = ?, data = ?, repete = ?, repete_sempre = ?, repete_meses = ? WHERE id = ?;',
      [tipo, nome, valor, data, repete, repete_sempre, repete_meses, id]
    );
    console.log('✅ Lançamento atualizado com sucesso.');
    return true;
  } catch (error) {
    console.error('❌ Erro ao atualizar lançamento:', error);
    return false;
  }
};

// ========== BUSCAR TOTAL POR TIPO ==========
const getTotalByTipo = async (tipo) => {
  try {
    const result = await db.getFirstAsync(
      'SELECT COALESCE(SUM(valor), 0) as total FROM lancamentos WHERE tipo = ?;',
      [tipo]
    );
    return result.total;
  } catch (error) {
    console.error('❌ Erro ao calcular total:', error);
    return 0;
  }
};

// ========== BUSCAR TOTAL POR TIPO E PERIODO ==========

const getTotalByTipoAndPeriodo = async (tipo, dataInicio, dataFim) => {
  try {
    console.log(`📊 Buscando ${tipo} entre ${dataInicio} e ${dataFim}`);
    
    const result = await db.getFirstAsync(
      'SELECT COALESCE(SUM(valor), 0) as total FROM lancamentos WHERE tipo = ? AND data BETWEEN ? AND ?;',
      [tipo, dataInicio, dataFim]
    );

    const total = result?.total || 0;
    console.log(`✅ Total de ${tipo} no período:`, total);
    return parseFloat(total) || 0;
  } catch (error) {
    console.error('❌ Erro ao calcular total por período:', error);
    return 0;
  }
};

// ========== BUSCAR LANÇAMENTOS POR PERÍODO ==========
const getLancamentosByPeriodo = async (dataInicio, dataFim) => {
  try {
    const lancamentos = await db.getAllAsync(
      'SELECT * FROM lancamentos WHERE data BETWEEN ? AND ? ORDER BY data DESC;',
      [dataInicio, dataFim]
    );
    return lancamentos;
  } catch (error) {
    console.error('❌ Erro ao buscar lançamentos por período:', error);
    return [];
  }
};

// Inicializar tabelas
createTables();

export {
  db,
  getLancamentos,
  addLancamento,
  deleteLancamento,
  updateLancamento,
  getTotalByTipo,
  getLancamentosByPeriodo,
  getTotalByTipoAndPeriodo
};