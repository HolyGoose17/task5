// 'use client';

// import { create } from 'zustand';

// import { SnippetsForm } from '@/src/utils/types';

// import { fetchSnippets } from '../shared/api/snippets';

// type SnippetData = SnippetsForm['data'];

// interface SnippetsStore {
//   page: number;
//   data: SnippetData['data'];
//   meta: SnippetData['meta'] | null;
//   isLoading: boolean;

//   init: (initial: SnippetData) => void;
//   loadPage: (page: number) => Promise<void>;
//   firstPage: () => Promise<void>;
//   nextPage: () => Promise<void>;
//   prevPage: () => Promise<void>;
//   lastPage: () => Promise<void>;
// }

// export const useSnippetsStore = create<SnippetsStore>((set, get) => ({
//   page: 1,
//   data: [],
//   meta: null,
//   isLoading: false,

//   init: (initial) =>
//     set({
//       data: initial.data,
//       meta: initial.meta,
//       page: initial.meta.currentPage,
//     }),

//   loadPage: async (page) => {
//     set({ isLoading: true });

//     try {
//       const result = await fetchSnippets(page);
//       if (result) {
//         set({
//           page,
//           data: result.data,
//           meta: result.meta,
//         });
//       }
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   firstPage: async () => {
//     const { page, meta, loadPage } = get();
//     if (!meta || page === 1) return;
//     await loadPage(1);
//   },

//   nextPage: async () => {
//     const { page, meta, loadPage } = get();
//     if (!meta || page >= meta.totalPages) return;
//     await loadPage(page + 1);
//   },

//   prevPage: async () => {
//     const { page, loadPage } = get();
//     if (page <= 1) return;
//     await loadPage(page - 1);
//   },

//   lastPage: async () => {
//     const { page, meta, loadPage } = get();
//     if (!meta || page === meta.totalPages) return;
//     await loadPage(meta.totalPages);
//   },
// }));

'use client';

import { create } from 'zustand';

import { SnippetsForm } from '@/src/utils/types';

import { fetchSnippets } from '../actions/snippets';

type SnippetData = SnippetsForm['data'];

interface SnippetsStore {
  page: number;
  pages: Record<number, SnippetData>;
  meta: SnippetData['meta'] | null;
  isLoading: boolean;

  init: (initial: SnippetData) => void;
  loadPage: (page: number) => Promise<void>;
  firstPage: () => Promise<void>;
  nextPage: () => Promise<void>;
  prevPage: () => Promise<void>;
  lastPage: () => Promise<void>;
}

export const useSnippetsStore = create<SnippetsStore>((set, get) => ({
  page: 1,
  pages: {},
  meta: null,
  isLoading: false,

  init: (initial) =>
    set((state) => ({
      page: initial.meta.currentPage,
      meta: initial.meta,
      pages: {
        ...state.pages,
        [initial.meta.currentPage]: initial,
      },
    })),

  loadPage: async (page) => {
    const { pages } = get();

    if (pages[page]) {
      set({ page });
      return;
    }

    set({ isLoading: true });

    try {
      const result = await fetchSnippets(page);

      if (result) {
        set((state) => ({
          page,
          meta: result.meta,
          pages: {
            ...state.pages,
            [page]: result,
          },
        }));
      }
    } finally {
      set({ isLoading: false });
    }
  },

  firstPage: async () => {
    const { page, meta, loadPage } = get();
    if (!meta || page === 1) return;
    await loadPage(1);
  },

  nextPage: async () => {
    const { page, meta, loadPage } = get();
    if (!meta || page >= meta.totalPages) return;
    await loadPage(page + 1);
  },

  prevPage: async () => {
    const { page, loadPage } = get();
    if (page <= 1) return;
    await loadPage(page - 1);
  },

  lastPage: async () => {
    const { page, meta, loadPage } = get();
    if (!meta || page === meta.totalPages) return;
    await loadPage(meta.totalPages);
  },
}));
