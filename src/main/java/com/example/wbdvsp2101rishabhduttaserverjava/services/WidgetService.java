package com.example.wbdvsp2101rishabhduttaserverjava.services;

import com.example.wbdvsp2101rishabhduttaserverjava.models.Widget;
import com.example.wbdvsp2101rishabhduttaserverjava.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WidgetService {

    @Autowired
    WidgetRepository repository;

    public Widget createWidget(String topicId, Widget widget) {
        return repository.save(widget);
    }

    public List<Widget> findAllWidgets() {
        return repository.findAllWidgets();
    }

    public List<Widget> findWidgetsForTopic(String topicId) {
        return repository.findWidgetsForTopic(topicId);
    }

    public Widget findWidgetById(Long id) {
        return repository.findWidgetById(id);
    }

    public Integer updateWidget(Long id, Widget newWidget) {
        Widget originalWidget = findWidgetById(id);

        originalWidget.copyDataFromWidget(newWidget);

        repository.save(originalWidget);
        return 1;
    }

    public Integer deleteWidget(Long id) {
        repository.deleteById(id);
        return 1;
    }
}