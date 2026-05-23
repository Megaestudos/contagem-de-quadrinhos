"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Mail, Lock } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/";
    } catch (err: any) {
      setError("Credenciais inválidas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary opacity-30 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-[100px]" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, ease: "easeOut" }}
           className="text-center"
        >
          <div className="mx-auto h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 shadow-glow-blue mb-6">
            <ShieldAlert className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground tracking-tight">
            Acesso Restrito
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Painel Administrativo Contagem
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="bg-card/70 backdrop-blur-xl py-8 px-4 shadow-glass sm:rounded-3xl sm:px-10 border border-white/10 dark:border-white/5">
          <form className="space-y-6" onSubmit={handleLogin}>
            
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-destructive/10 text-destructive text-sm p-3 rounded-xl flex items-center gap-2 border border-destructive/20">
                <ShieldAlert className="w-5 h-5 flex-shrink-0" /> {error}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1 ml-1">Usuário / Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-input/50 rounded-xl bg-background/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                  placeholder="admin@megaestudos.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1 ml-1">Senha de Acesso</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-input/50 rounded-xl bg-background/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Verificando Autenticidade..." : "Acessar Sistema"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
