import * as React from 'react';
import "@/app/globals.css";


export default function AlpacaInfo() {

  return (


    <div className="w-full pt-5 text-slate-800 pl-10">
      
        <h1 className='text-2xl font-bold'>Anleitung zur Konfiguration der Brokereinstellungen</h1>
        <p>Diese Anleitung führt Sie durch die Konfiguration der Brokereinstellungen in Ihrer Trading-Anwendung.</p>

        <h2>1. Login-Daten eingeben</h2>
        <ol>
          <li><strong>Öffnen Sie die Anwendung</strong>: Starten Sie die Trading-Anwendung auf Ihrem Computer oder Mobilgerät.</li>
          <li><strong>Navigieren Sie zu den Einstellungen</strong>: Gehen Sie in das Menü und wählen Sie <code>Einstellungen</code> oder <code>Broker-Einstellungen</code>.</li>
          <li><strong>Login-Daten eingeben</strong>:
            <ul>
              <li><strong>Benutzername</strong>: Geben Sie Ihren Broker-Benutzernamen in das entsprechende Feld ein.</li>
              <li><strong>Passwort</strong>: Geben Sie Ihr Passwort ein. Stellen Sie sicher, dass Sie das Passwort korrekt eingegeben haben.</li>
              <li><strong>Server/Host</strong>: Wählen Sie den Server oder Host aus, der Ihnen von Ihrem Broker zur Verfügung gestellt wurde.</li>
              <li><strong>Port</strong>: Geben Sie den entsprechenden Port ein, falls erforderlich.</li>
            </ul>
          </li>
          <li><strong>Login-Daten speichern</strong>: Aktivieren Sie das Kontrollkästchen <code>Anmeldedaten speichern</code> oder eine ähnliche Option, um Ihre Login-Daten für zukünftige Logins zu speichern.</li>
          <li><strong>Verbinden</strong>: Klicken Sie auf <code>Verbinden</code> oder <code>Login</code>, um sich mit Ihrem Brokerkonto zu verbinden.</li>
        </ol>

        <h2>2. Auswahl des Assets</h2>
        <ol>
          <li><strong>Asset-Auswahl öffnen</strong>: Nach erfolgreichem Login können Sie die Liste der verfügbaren Assets (z. B. Aktien, Währungen, Rohstoffe) einsehen.</li>
          <li><strong>Asset wählen</strong>:
            <ul>
              <li>Suchen Sie nach dem gewünschten Asset in der Liste.</li>
              <li>Klicken Sie auf das Asset, um es auszuwählen.</li>
              <li>Falls nötig, verwenden Sie Filter oder eine Suchfunktion, um das Asset schneller zu finden.</li>
            </ul>
          </li>
          <li><strong>Asset speichern</strong>: Klicken Sie auf <code>Speichern</code> oder <code>Als Favorit markieren</code>, um das gewählte Asset für den schnellen Zugriff zu speichern.</li>
        </ol>

        <h2>3. Einstellungen speichern</h2>
        <ol>
          <li><strong>Einstellungen überprüfen</strong>: Überprüfen Sie, ob alle Angaben korrekt sind.</li>
          <li><strong>Speichern</strong>: Klicken Sie auf die Schaltfläche <code>Speichern</code> oder <code>Einstellungen speichern</code>, um alle vorgenommenen Änderungen zu sichern.</li>
          <li><strong>Bestätigung</strong>: Die Anwendung wird Sie möglicherweise bitten, die Änderungen zu bestätigen. Klicken Sie auf <code>Ja</code> oder <code>Bestätigen</code>.</li>
        </ol>

        <h2>4. Abschluss</h2>
        <ol>
          <li><strong>Überprüfung</strong>: Stellen Sie sicher, dass alle Daten korrekt gespeichert wurden, indem Sie die Anwendung neu starten und prüfen, ob Ihre Einstellungen übernommen wurden.</li>
          <li><strong>Starten Sie das Trading</strong>: Nach erfolgreicher Konfiguration können Sie mit dem Trading beginnen.</li>
        </ol>
      </div>

  );
}