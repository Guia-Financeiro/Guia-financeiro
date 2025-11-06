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
        data TEXT NOT NULL
      );
    `);
    console.log('✅ Tabela lancamentos criada ou já existe.');
  } catch (error) {
    console.error('❌ Erro ao criar tabela lancamentos:', error);
  }
};

// ========== BUSCAR LANÇAMENTOS ==========
// ANTES: getLancamentos(setLancamentos) - callback
// AGORA: await getLancamentos() - async/await
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
const addLancamento = async (tipo, nome, valor, data) => {
  try {
    await db.runAsync(
      'INSERT INTO lancamentos (tipo, nome, valor, data) VALUES (?, ?, ?, ?);',
      [tipo, nome, valor, data]
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
const updateLancamento = async (id, tipo, nome, valor, data) => {
  try {
    await db.runAsync(
      'UPDATE lancamentos SET tipo = ?, nome = ?, valor = ?, data = ? WHERE id = ?;',
      [tipo, nome, valor, data, id]
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
  getLancamentosByPeriodo
};