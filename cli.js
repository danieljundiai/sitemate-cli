#!/usr/bin/env node

const axios = require('axios');
const yargs = require('yargs');

const apiUrl = 'http://localhost:3000/item'; 

const createItem = async (item) => {
  try {
    const response = await axios.post(apiUrl, item);
    console.log('Create response:', response.data);
  } catch (error) {
    console.error('Error creating item:', error.message);
  }
};

const readItems = async () => {
  try {
    const response = await axios.get(apiUrl);
    console.log('Read response:', response.data);
  } catch (error) {
    console.error('Error reading items:', error.message);
  }
};

const updateItem = async (id, item) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, item);
    console.log('Update response:', response.data);
  } catch (error) {
    console.error('Error updating item:', error.message);
  }
};

const deleteItem = async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    console.log(`Item with id ${id} deleted.`);
  } catch (error) {
    console.error('Error deleting item:', error.message);
  }
};

yargs
  .command({
    command: 'create',
    describe: 'Create a new item',
    builder: {
      id: {
        describe: 'Item ID',
        demandOption: true,
        type: 'number',
      },
      title: {
        describe: 'Item title',
        demandOption: true,
        type: 'string',
      },
      description: {
        describe: 'Item description',
        demandOption: true,
        type: 'string',
      },
    },
    handler: (argv) => createItem({ id: argv.id, title: argv.title, description: argv.description }),
  })
  .command({
    command: 'read',
    describe: 'Read all items',
    handler: () => readItems(),
  })
  .command({
    command: 'update',
    describe: 'Update an existing item',
    builder: {
      id: {
        describe: 'Item ID',
        demandOption: true,
        type: 'number',
      },
      title: {
        describe: 'New item title',
        demandOption: true,
        type: 'string',
      },
      description: {
        describe: 'New item description',
        demandOption: true,
        type: 'string',
      },
    },
    handler: (argv) => updateItem(argv.id, { title: argv.title, description: argv.description }),
  })
  .command({
    command: 'delete',
    describe: 'Delete an item',
    builder: {
      id: {
        describe: 'Item ID',
        demandOption: true,
        type: 'number',
      },
    },
    handler: (argv) => deleteItem(argv.id),
  })
  .help()
  .alias('help', 'h')
  .argv;
