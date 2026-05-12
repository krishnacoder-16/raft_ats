import { SettingsSection } from "./settings-section";

export function NotificationSettings() {
  const notifications = [
    { title: "New Candidate Application", desc: "When a candidate applies to an active requisition.", email: true, inApp: true },
    { title: "Offer Accepted", desc: "When a candidate signs an offer letter.", email: true, inApp: true },
  ];

  return (
    <SettingsSection title="Notification Preferences" description="Control how and when your team receives alerts.">
      <div className="p-6">
        <div className="border rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 border-b text-xs text-muted-foreground uppercase font-extrabold tracking-wider">
              <tr>
                <th className="px-5 py-4">Event</th>
                <th className="px-5 py-4 text-center">Email</th>
                <th className="px-5 py-4 text-center">In-App</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {notifications.map((notif, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-extrabold text-foreground">{notif.title}</p>
                    <p className="text-xs font-medium text-muted-foreground mt-0.5">{notif.desc}</p>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <input type="checkbox" defaultChecked={notif.email} className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary" />
                  </td>
                  <td className="px-5 py-4 text-center">
                    <input type="checkbox" defaultChecked={notif.inApp} className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="pt-6 flex justify-end">
          <button className="px-6 py-2.5 bg-primary text-primary-foreground font-extrabold text-sm rounded-lg shadow-sm hover:bg-primary/90 transition-colors">
            Save Preferences
          </button>
        </div>
      </div>
    </SettingsSection>
  );
}
