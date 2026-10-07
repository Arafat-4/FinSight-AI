import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { dataService } from '../../services/dataService';
import { PlatformDocument } from '../../types';
import {
  FileText,
  Search,
  Upload,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  Tag,
  Info,
  FolderOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const DocumentsPage: React.FC = () => {
  const { currentUser } = useAuth();

  const [documents, setDocuments] = useState<PlatformDocument[]>(() => dataService.getDocuments());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<PlatformDocument | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Upload Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<PlatformDocument['category']>('KYC Verification');
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created = dataService.addDocument({
      title: newTitle.endsWith('.pdf') ? newTitle : `${newTitle}.pdf`,
      category: newCategory,
      fileSize: '1.2 MB',
      uploadedBy: currentUser?.name || 'Administrator',
      tags: ['Uploaded', 'Phase 0 Foundation']
    });

    setDocuments(dataService.getDocuments());
    setUploadFeedback(`Document "${created.title}" successfully queued.`);
    setTimeout(() => {
      setShowUploadModal(false);
      setUploadFeedback(null);
      setNewTitle('');
    }, 700);
  };

  const filteredDocs = documents.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <AppShell pageTitle="Documents">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Document & Compliance Repository
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              UI foundation for financial statements, KYC verification proofs, risk audits, and compliance logs.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={<Upload className="w-3.5 h-3.5" />}
            onClick={() => setShowUploadModal(true)}
          >
            Upload Document
          </Button>
        </div>

        {/* Phase 0 Limitation Notice */}
        <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200/90 flex items-start gap-3 text-xs text-slate-600">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <span>
            <strong>UI Foundation Only:</strong> Per Phase 0 guidelines, OCR pipelines, vector embeddings, and RAG document search are reserved for future backend milestones. This screen establishes the metadata taxonomy, upload interaction, and repository view.
          </span>
        </div>

        {/* Search & Actions Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search document title, category, or uploader..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <span className="text-xs font-mono text-slate-400 hidden sm:block">
            {filteredDocs.length} Documents Indexed
          </span>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-[#FAF9F5] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Document Title</th>
                  <th className="py-3 px-3">Doc ID</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Size</th>
                  <th className="py-3 px-3">Uploaded By</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-emerald-800 shrink-0" />
                        <span className="font-bold text-slate-900">{doc.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-500">{doc.id}</td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600">{doc.fileSize}</td>
                    <td className="py-3 px-3 text-slate-700">{doc.uploadedBy}</td>
                    <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">{doc.uploadedAt}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                          doc.status === 'Processed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : doc.status === 'Queued'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={<Eye className="w-3.5 h-3.5" />}
                        onClick={() => setSelectedDoc(doc)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredDocs.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <FolderOpen className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-medium">No documents match the search criteria.</p>
            </div>
          )}
        </div>

        {/* View Document Modal */}
        <Modal
          isOpen={!!selectedDoc}
          onClose={() => setSelectedDoc(null)}
          title={selectedDoc?.title || 'Document Metadata'}
          subtitle={`Document ID: ${selectedDoc?.id} • Category: ${selectedDoc?.category}`}
          maxWidth="md"
        >
          {selectedDoc && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Uploaded By</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{selectedDoc.uploadedBy}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">File Size</span>
                  <span className="font-mono font-bold text-slate-900 mt-0.5 block">{selectedDoc.fileSize}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Ingestion Date</span>
                  <span className="font-mono text-slate-700 mt-0.5 block">{selectedDoc.uploadedAt}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Index Status</span>
                  <span className="font-semibold text-emerald-700 mt-0.5 block">{selectedDoc.status}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-600 block mb-1">Metadata Tags</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDoc.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded font-mono text-[11px]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <Button variant="primary" size="sm" onClick={() => setSelectedDoc(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Upload Document Modal */}
        <Modal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          title="Upload Compliance Document"
          subtitle="Deposit files into FinSight repository for future indexing."
          maxWidth="md"
        >
          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Document Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Q3_Forensics_Summary.pdf"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as PlatformDocument['category'])}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
              >
                <option value="KYC Verification">KYC Verification</option>
                <option value="Risk Audit">Risk Audit</option>
                <option value="Compliance Report">Compliance Report</option>
                <option value="Financial Statement">Financial Statement</option>
                <option value="Transaction Log">Transaction Log</option>
              </select>
            </div>

            {uploadFeedback && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{uploadFeedback}</span>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button variant="secondary" size="sm" type="button" onClick={() => setShowUploadModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Upload & Register
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AppShell>
  );
};
