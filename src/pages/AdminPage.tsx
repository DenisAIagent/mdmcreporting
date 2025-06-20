import React from 'react';
import Layout from '@/components/common/Layout';
import AdminPanel from '@/components/admin/AdminPanel';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <Layout>
        <AdminPanel />
      </Layout>
    </ProtectedRoute>
  );
}