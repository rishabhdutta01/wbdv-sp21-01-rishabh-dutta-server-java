package com.example.wbdvsp2101rishabhduttaserverjava.services;

import com.example.wbdvsp2101rishabhduttaserverjava.models.Widget;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.ArrayList;

@Service
public class WidgetService {

    private List<Widget> widgetList = new ArrayList<>();

    public Widget createWidget(String topicId, Widget widget) {
        Long id = (new Date()).getTime();
        widget.setId(id);
        widget.setTopicId(topicId);
        widgetList.add(widget);
        return widget;
    }

    public List<Widget> findAllWidgets() {
        return widgetList;
    }

    public List<Widget> findWidgetsForTopic(String topicId) {
        List<Widget> ws = new ArrayList<Widget>();
        for (Widget w : widgetList) {
            if (w.getTopicId().equals(topicId)) {
                ws.add(w);
            }
        }
        return ws;
    }

    public Widget findWidgetById(Long id) {
        for (Widget w : widgetList) {
            if (w.getId().equals(id)) {
                return w;
            }
        }
        return null;
    }

    public Integer updateWidget(Long id, Widget newWidget) {
        for (int i = 0; i < widgetList.size(); i++) {
            Widget w = widgetList.get(i);
            if (w.getId().equals(id)) {
                widgetList.set(i, newWidget);
                return 1;
            }
        }
        return -1;
    }

    public Integer deleteWidget(Long id) {
        int index = -1;
        for (int i = 0; i < widgetList.size(); i++) {
            if (widgetList.get(i).getId().equals(id)) {
                index = i;
                widgetList.remove(index);
                return 1;
            }
        }
        return -1;
    }
}