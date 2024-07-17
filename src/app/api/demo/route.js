// pages/api/items.js
export default function handler(req, res) {
    if (req.method === 'GET') {
      // Sample data
      const items = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ];
      res.status(200).json(items);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  