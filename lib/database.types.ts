export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            answers: {
                Row: {
                    created_at: string
                    id: string
                    is_correct: boolean
                    participant_id: string
                    question_id: number
                    section: string
                    selected_option: string
                }
                Insert: {
                    created_at?: string
                    id?: string
                    is_correct: boolean
                    participant_id: string
                    question_id: number
                    section: string
                    selected_option: string
                }
                Update: {
                    created_at?: string
                    id?: string
                    is_correct?: boolean
                    participant_id?: string
                    question_id?: number
                    section?: string
                    selected_option?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "answers_participant_id_fkey"
                        columns: ["participant_id"]
                        isOneToOne: false
                        referencedRelation: "participants"
                        referencedColumns: ["id"]
                    },
                ]
            }
            participants: {
                Row: {
                    created_at: string
                    email: string
                    id: string
                    institution: string
                    mobile: string
                    name: string
                    role: string
                }
                Insert: {
                    created_at?: string
                    email: string
                    id?: string
                    institution: string
                    mobile: string
                    name: string
                    role: string
                }
                Update: {
                    created_at?: string
                    email?: string
                    id?: string
                    institution?: string
                    mobile?: string
                    name?: string
                    role?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            get_admin_data: {
                Args: {
                    secret_key: string
                }
                Returns: Json
            }
            get_participant_details: {
                Args: {
                    secret_key: string
                    p_id: string
                }
                Returns: Json
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
