import createClient from './oss-client';

async function upload (name, file, options = {}) {
  const client = await createClient();
  await client.put(name, file);
  return name;
}

export default upload;
