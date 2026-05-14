"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  seedBand,
  seedLeads,
  seedProposals,
  seedMusicians,
  seedBookings,
  seedAutomations,
  seedContracts,
  seedPayments,
} from "./seed";
import { generateId } from "./utils";
import type {
  Band,
  EventLead,
  Proposal,
  Musician,
  EventBooking,
  FollowUpAutomation,
  Contract,
  Payment,
  Plan,
} from "@/types/entities";

interface BandFlowState {
  plan: Plan;
  trialEndsAt: string | null;
  band: Band;
  leads: EventLead[];
  proposals: Proposal[];
  musicians: Musician[];
  bookings: EventBooking[];
  automations: FollowUpAutomation[];
  contracts: Contract[];
  payments: Payment[];

  setBand: (band: Partial<Band>) => void;
  setPlan: (plan: Plan) => void;

  addLead: (data: Omit<EventLead, "id" | "createdAt">) => void;
  updateLead: (id: string, data: Partial<EventLead>) => void;
  deleteLead: (id: string) => void;

  addProposal: (data: Omit<Proposal, "id" | "createdAt" | "publicLink">) => void;
  updateProposal: (id: string, data: Partial<Proposal>) => void;
  deleteProposal: (id: string) => void;

  addMusician: (data: Omit<Musician, "id">) => void;
  updateMusician: (id: string, data: Partial<Musician>) => void;
  deleteMusician: (id: string) => void;

  addBooking: (data: Omit<EventBooking, "id">) => void;
  updateBooking: (id: string, data: Partial<EventBooking>) => void;
  deleteBooking: (id: string) => void;

  addAutomation: (data: Omit<FollowUpAutomation, "id">) => void;
  updateAutomation: (id: string, data: Partial<FollowUpAutomation>) => void;
  deleteAutomation: (id: string) => void;

  addContract: (data: Omit<Contract, "id" | "createdAt">) => void;
  updateContract: (id: string, data: Partial<Contract>) => void;

  addPayment: (data: Omit<Payment, "id">) => void;
  updatePayment: (id: string, data: Partial<Payment>) => void;

  resetDemo: () => void;
}

const initialState = {
  plan: "TRIAL" as Plan,
  trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  band: seedBand,
  leads: seedLeads,
  proposals: seedProposals,
  musicians: seedMusicians,
  bookings: seedBookings,
  automations: seedAutomations,
  contracts: seedContracts,
  payments: seedPayments,
};

export const useStore = create<BandFlowState>()(
  persist(
    (set) => ({
      ...initialState,

      setBand: (data) => set((s) => ({ band: { ...s.band, ...data } })),
      setPlan: (plan) => set({ plan }),

      addLead: (data) =>
        set((s) => ({
          leads: [
            { ...data, id: generateId(), createdAt: new Date().toISOString() },
            ...s.leads,
          ],
        })),
      updateLead: (id, data) =>
        set((s) => ({
          leads: s.leads.map((l) => (l.id === id ? { ...l, ...data } : l)),
        })),
      deleteLead: (id) => set((s) => ({ leads: s.leads.filter((l) => l.id !== id) })),

      addProposal: (data) =>
        set((s) => ({
          proposals: [
            {
              ...data,
              id: generateId(),
              publicLink: `/p/${generateId()}`,
              createdAt: new Date().toISOString(),
            },
            ...s.proposals,
          ],
        })),
      updateProposal: (id, data) =>
        set((s) => ({
          proposals: s.proposals.map((p) => (p.id === id ? { ...p, ...data } : p)),
        })),
      deleteProposal: (id) =>
        set((s) => ({ proposals: s.proposals.filter((p) => p.id !== id) })),

      addMusician: (data) =>
        set((s) => ({ musicians: [{ ...data, id: generateId() }, ...s.musicians] })),
      updateMusician: (id, data) =>
        set((s) => ({
          musicians: s.musicians.map((m) => (m.id === id ? { ...m, ...data } : m)),
        })),
      deleteMusician: (id) =>
        set((s) => ({ musicians: s.musicians.filter((m) => m.id !== id) })),

      addBooking: (data) =>
        set((s) => ({ bookings: [{ ...data, id: generateId() }, ...s.bookings] })),
      updateBooking: (id, data) =>
        set((s) => ({
          bookings: s.bookings.map((b) => (b.id === id ? { ...b, ...data } : b)),
        })),
      deleteBooking: (id) =>
        set((s) => ({ bookings: s.bookings.filter((b) => b.id !== id) })),

      addAutomation: (data) =>
        set((s) => ({
          automations: [{ ...data, id: generateId() }, ...s.automations],
        })),
      updateAutomation: (id, data) =>
        set((s) => ({
          automations: s.automations.map((a) => (a.id === id ? { ...a, ...data } : a)),
        })),
      deleteAutomation: (id) =>
        set((s) => ({ automations: s.automations.filter((a) => a.id !== id) })),

      addContract: (data) =>
        set((s) => ({
          contracts: [
            { ...data, id: generateId(), createdAt: new Date().toISOString() },
            ...s.contracts,
          ],
        })),
      updateContract: (id, data) =>
        set((s) => ({
          contracts: s.contracts.map((c) => (c.id === id ? { ...c, ...data } : c)),
        })),

      addPayment: (data) =>
        set((s) => ({ payments: [{ ...data, id: generateId() }, ...s.payments] })),
      updatePayment: (id, data) =>
        set((s) => ({
          payments: s.payments.map((p) => (p.id === id ? { ...p, ...data } : p)),
        })),

      resetDemo: () => set(initialState),
    }),
    {
      name: "bandflow-store",
      version: 1,
    },
  ),
);
