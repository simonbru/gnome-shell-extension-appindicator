const Gio = imports.gi.Gio
const GLib = imports.gi.GLib


const xml = `
<node>
<interface name="org.kde.StatusNotifierWatcher">
    <method name="RegisterStatusNotifierItem">
        <arg type="s" direction="in" />
    </method>
    <method name="RegisterNotificationHost">
        <arg type="s" direction="in" />
    </method>
    <property name="RegisteredStatusNotifierItems" type="as" access="read" />
    <method name="ProtocolVersion">
        <arg type="s" direction="out" />
    </method>
    <method name="IsNotificationHostRegistered">
        <arg type="b" direction="out" />
    </method>
    <signal name="ServiceRegistered">
        <arg type="s" direction="out" />
    </signal>
    <signal name="ServiceUnregistered">
        <arg type="s" direction="out" />
    </signal>
    <property name="IsStatusNotifierHostRegistered" type="b" access="read" />
</interface>
</node>
`;


// const watcherInfo = Gio.DBusNodeInfo.new_for_xml(xml);
// const ttest = Gio.DBusProxy.new_sync(
//     Gio.DBus.session,
//     Gio.DBusProxyFlags.NONE,
//     watcherInfo,
//     'org.kde.StatusNotifierWatcher',
//     '/StatusNotifierWatcher',
//     'org.kde.StatusNotifierWatcher',
//     null,
//     null
// );

const WatcherProxy = Gio.DBusProxy.makeProxyWrapper(xml);
let watcherProxy = new WatcherProxy(
    Gio.DBus.session,
    "org.kde.StatusNotifierWatcher",
    "/StatusNotifierWatcher"
);

print(watcherProxy.RegisteredStatusNotifierItems);

watcherProxy.connectSignal("StatusNotifierItemRegistered", function() {
    for (arg in arguments) {
        print(arguments[arg])
    }
})

let loop = new GLib.MainLoop(null, false);
loop.run();